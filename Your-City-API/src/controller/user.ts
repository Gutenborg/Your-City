import { RequestHandler } from 'express';
import { compareSync, hashSync } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import UserModel, { IUser, IUserDocument } from '../models/user';
import TokenModel from '../models/token';
import { validateEmail, validatePassword, validateRole, validateUsername } from '../helpers/validation';
import { Empty, ResultOrError } from '../models/sharedTypes';

const accessTokenSecret = 'wgTRn7usLJM3hmu7DzbOmc81sY7VzpcOH9yiVqRHWMGJOk8ukR8wvEZnqztdSQp';
const refreshTokenSecret = 'PrrchkIg5kUlJvKNhTvhLp4S2R6WTwon3Osy2X1rgbMWd7PksrN0Rz8pAYLhdt9';
const passwordPlaceholder = '****';
const tokenExpiresIn = 3600;
const passwordHashSalt = 10;
const verificationDomain = 'https://yourcity.directory';

// Get all users
export const getUsers: RequestHandler<Empty, ResultOrError<IUserDocument[]>, IUser, Empty> = (request, response) => {
  UserModel.find({}, (err, users) => {
    if (err) return response.json(err);

    // Replace each user's password with a placeholder
    users.forEach((user) => (user.hashPassword = passwordPlaceholder));

    // Send the response
    return response.json(users);
  });
};

// Get single user
export const getUserById: RequestHandler<Record<'id', string>, ResultOrError<IUserDocument>, Empty, Empty> = (
  request,
  response
) => {
  // Search for the user
  UserModel.findById(request.params.id, {}, {}, (err, user) => {
    if (err) return response.json(err);

    // If a user is found replace the password with a placeholder
    if (user) {
      user.hashPassword = passwordPlaceholder;
    }

    // Send the response
    return response.json(user);
  });
};

// Create a user
export const createUser: RequestHandler<Empty, ResultOrError<IUserDocument>, IUser, Empty> = async (
  request,
  response
) => {
  // Capture necessary values from the body
  const { email, username, hashPassword: password, role } = request.body;

  // Test variables to make sure they have valid values
  if (!email || !username || !password || !role) {
    response.status(400).json({ message: 'To create a user you must submit all necessary fields.' });
  } else if (!validateEmail(email)) {
    response.status(400).json({ message: 'Invalid email!' });
  } else if (!validatePassword(password)) {
    response.status(400).json({ message: 'Invalid password!' });
  } else if (!validateUsername(username)) {
    response.status(400).json({ message: 'Invalid username!' });
  } else if (!validateRole(role)) {
    response.status(400).json({ message: 'Invalid role!' });
  }

  // Check the database to see if the email or username values already exist
  const duplicateEmail = await UserModel.exists({ email });
  const duplicateUsername = await UserModel.exists({ username });

  // Test to see if the email or username values are duplicates
  if (duplicateEmail) {
    response.status(401).json({ message: 'User creation failed. Email already exists and should be unique.' });
  } else if (duplicateUsername) {
    response.status(401).json({ message: 'User creation failed. Username already exists and should be unique.' });
  } else {
    // Create a new user
    const newUser = new UserModel({ email, username, password, role });

    // Hash the password before it is stored
    newUser.hashPassword = hashSync(password, passwordHashSalt);

    // Save the user to the database
    newUser.save((err, user) => {
      if (err) {
        return response.status(400).json(err);
      } else {
        // Replace the user's password with a placeholder
        user.hashPassword = passwordPlaceholder;

        // Send the response
        return response.json(user);
      }
    });
  }
};

// Edit an existing user
export const editUser: RequestHandler<Record<'id', string>, ResultOrError<IUserDocument>, IUser, Empty> = (
  request,
  response
) => {
  // Capture necessary values from the body
  const { email, username, role } = request.body;

  // Test variables to make sure they have valid values
  if (!email || !username || !role) {
    response.status(400).json({ message: 'To create a user you must submit all necessary fields.' });
  } else if (!validateEmail(email)) {
    response.status(400).json({ message: 'Invalid email!' });
  } else if (!validateUsername(username)) {
    response.status(400).json({ message: 'Invalid username!' });
  } else if (!validateRole(role)) {
    response.status(400).json({ message: 'Invalid role!' });
  } else {
    // Search for the existing user
    UserModel.findByIdAndUpdate(request.params.id, { email, role, username }, {}, (err, user) => {
      if (err) return response.json(err);

      // Replace the user's password with a placeholder before sending the response
      if (user) {
        user.hashPassword = passwordPlaceholder;
      }

      // Send the response
      return response.json(user);
    });
  }
};

// Delete an existing user
export const deleteUser: RequestHandler<Record<'id', string>, ResultOrError<IUserDocument>, Empty, Empty> = (
  request,
  response
) => {
  // Search for the existing user
  UserModel.findByIdAndRemove(request.params.id, {}, (err, user) => {
    if (err) return response.json(err);

    // Replace the user's password with a placeholder before sending the response
    if (user) {
      user.hashPassword = passwordPlaceholder;
    }

    // Send the response
    return response.json(user);
  });
};

// Login a user by issuing a JWT token
export const loginUser: RequestHandler<
  Empty,
  ResultOrError<Record<'accessToken' | 'refreshToken', string>>,
  Record<'email' | 'password', string>,
  Empty
> = (request, response) => {
  // Capture necessary values from the body
  const { email, password } = request.body;

  // Search for the user in the database
  UserModel.findOne({ email }, {}, {}, async (err, user) => {
    if (err) return response.json(err);

    // Check to see if there was a user found
    if (user) {
      // Check to see if the password matches
      if (password && user.hashPassword && compareSync(password, user.hashPassword)) {
        // Create and sign a JWT access token
        const accessToken = jsonwebtoken.sign(
          { email: user.email, username: user.username, _id: user.id, role: user.role },
          accessTokenSecret,
          { expiresIn: tokenExpiresIn }
        );

        // Create and sign a JWT refresh token
        // Check if user already has a refresh token
        let refreshToken = '';

        await TokenModel.findOne({ user: user.email }, {}, {}, (err, token) => {
          if (err) return response.json(err);

          if (token) {
            refreshToken = token?.token;
          }
        });

        //Issue a token if one does not exist
        if (!refreshToken) {
          refreshToken = jsonwebtoken.sign(
            { email: user.email, username: user.username, _id: user.id, role: user.role },
            refreshTokenSecret
          );

          // Save the refresh token
          const newToken = new TokenModel({ token: refreshToken, user: user.email });

          newToken.save((err) => {
            if (err) return response.json(err);
          });
        }

        // Send the response
        return response.json({
          accessToken,
          refreshToken,
        });
      } else {
        return response.status(401).json({ message: 'Authentication failed. Wrong password' });
      }
    } else {
      return response.status(401).json({ message: 'Authentication failed. No user found' });
    }
  });
};

// Determine if a user has a valid access token and correct role permissions
export const verifyUser = (role?: IUser['role'] | IUser['role'][]): RequestHandler => {
  return (request, response, next) => {
    // Verify Domain Name and if there is a 'role' value to test
    if (process.env?.NODE_ENV === 'production' && verificationDomain !== request.headers?.origin) {
      return response.status(403).json({
        message: 'Authorization failed! The domain name is not a qualified domain.' + request.headers?.origin,
      });
    } else if (!role) {
      next();
      return;
    }

    // Capture authorization header
    const { authorization } = request.headers;

    // Check to see if the authorization header exists
    if (authorization) {
      // Capture the token from the authorization header
      const authorizationToken = authorization.split(' ')[1];

      // Verify the token against the access token secret
      jsonwebtoken.verify(authorizationToken, accessTokenSecret, (err, decoded) => {
        if (err) {
          return response.status(403).json(err);
        } else if (decoded) {
          // Search the database for the access token's user
          UserModel.findOne({ email: (decoded as IUserDocument).email }, {}, {}, (err, user) => {
            if (err) return response.status(401).json(err);

            // Check to see if the user exists in the database and if the role permissions are the same
            if (user && (user.role === role || (Array.isArray(role) && role.includes(user.role)))) {
              // If everything matches then proceed to the next handler
              next();
            } else {
              return response
                .status(401)
                .json({ message: 'Unauthorized user! This user does not have the required role permissions.' });
            }
          });
        } else {
          return response
            .status(401)
            .json({ message: 'Unauthorized user! The token is valid, but the defined user no longer exists.' });
        }
      });
    } else {
      return response.status(401).json({ message: 'Unauthorized user!' });
    }
  };
};

// Determine if a user has a valid refresh token and exchange it for an access token
export const verifyRefreshToken: RequestHandler = async (request, response) => {
  // Capture the token
  const { token } = request.body as { token: string };

  // Check to see if there is a token
  if (!token) {
    return response.status(401).json({ message: 'No token recieved.' });
  }

  // Check to see if the token is in the list of saved tokens
  const savedToken = await TokenModel.exists({ token });

  if (!savedToken) {
    return response.status(403).json({ message: 'Invalid token recieved.' });
  }

  // Verify the signature on the refresh token
  jsonwebtoken.verify(token, refreshTokenSecret, (err, decoded) => {
    if (err) return response.status(403).json(err);

    // Check if the decoded refresh token has information in it
    if (decoded) {
      // Create an access token
      const accessToken = jsonwebtoken.sign(
        {
          email: (decoded as IUserDocument).email,
          username: (decoded as IUserDocument).username,
          _id: (decoded as IUserDocument).id,
          role: (decoded as IUserDocument).role,
        },
        accessTokenSecret,
        { expiresIn: tokenExpiresIn }
      );

      // Send the response
      return response.json({
        accessToken,
      });
    } else {
      return response.status(401).json({ message: 'No user found in token.' });
    }
  });
};

export const logoutUser: RequestHandler = (request, response) => {
  // Capture the token
  const { email } = request.body as { email: string };

  // Remove the token from the list of saved tokens
  TokenModel.deleteMany({ user: email }, {}, (err) => {
    if (err) return response.json(err);

    // Send the response
    return response.json({ message: 'Logout Successful' });
  });
};

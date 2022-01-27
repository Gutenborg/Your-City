# The Dockerfile creates the environment for the code to be run in and will be deployed to the server.
FROM nginx

# Jenkins will build out the application and place it in a 'build' folder.
COPY ./build /usr/share/nginx/html

EXPOSE 80
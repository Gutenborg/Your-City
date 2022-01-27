import React from 'react';
import { Avatar, ButtonBase, Divider, Grid, fade, makeStyles, Paper, Typography } from '@material-ui/core';
import BusinessOutlinedIcon from '@material-ui/icons/BusinessOutlined';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/constants';
import { APIBusiness } from '../../../api';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import CheckIcon from '@material-ui/icons/Check';

export interface BusinessSearchResultProps extends APIBusiness {}

const useStyles = makeStyles(({ palette, shadows, shape, spacing, typography }) => ({
  paper: {
    borderColor: palette.grey[400],
    borderRadius: shape.borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: shadows[0],
    padding: spacing(2),
    textAlign: 'left',
    '&:hover': {
      boxShadow: shadows[5],
    },
  },
  businessImage: {
    borderRadius: shape.borderRadius,
    height: spacing(20),
    width: spacing(20),
  },
  businessImageAvatar: {
    backgroundColor: fade(palette.primary.light, 0.4),
    fontSize: spacing(10),
    height: spacing(20),
    width: spacing(20),
  },
  featureIcon: {
    color: palette.success.main,
  },
  locallyOwned: {
    color: palette.secondary.dark,
    marginTop: spacing(2),
  },
}));

export const BusinessSearchResult: React.FC<BusinessSearchResultProps> = ({
  category,
  _id,
  logo,
  name,
  street,
  tags,
  contact,
  manager,
  features,
}) => {
  const { businessImage, businessImageAvatar, featureIcon, locallyOwned, paper } = useStyles();

  return (
    <ButtonBase component={Link} to={`/business/${_id}`}>
      <Paper className={paper}>
        <Grid container spacing={2}>
          <Grid item xs="auto">
            {logo ? (
              <img className={businessImage} src={`${API_BASE_URL}${logo}` || 'none'} alt={name} />
            ) : (
              <Avatar className={businessImageAvatar} variant="rounded">
                <BusinessOutlinedIcon fontSize="inherit" />
              </Avatar>
            )}
          </Grid>

          <Grid container item xs spacing={1} alignContent="flex-start">
            <Grid container item xs={12} alignItems="flex-start" spacing={1}>
              <Grid item xs={12} md="auto">
                <Typography variant="h3">{name}</Typography>
              </Grid>

              {manager?.managementType === 'owner' && (
                <Grid container item xs={12} md className={locallyOwned}>
                  <Grid item xs="auto">
                    <FlareOutlinedIcon />
                  </Grid>

                  <Grid item xs="auto">
                    <Typography variant="body1">Locally Owned!</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>

            <Grid container item xs={12} alignItems="center">
              <Grid item xs={12} lg={2} md={3}>
                <Grid container>
                  {contact?.phone && (
                    <Grid item xs={12}>
                      <Typography variant="body2">{contact.phone}</Typography>
                    </Grid>
                  )}

                  {street && (
                    <Grid item xs={12}>
                      <Typography variant="body1">{street}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid container item xs spacing={1}>
                {features &&
                  features.map((tag, index) => {
                    if (index > 2) return '';

                    return (
                      <React.Fragment>
                        <Grid item xs="auto">
                          <CheckIcon className={featureIcon} />
                        </Grid>

                        <Grid item xs="auto">
                          <Typography component="span">{tag}</Typography>
                        </Grid>
                      </React.Fragment>
                    );
                  })}
              </Grid>
            </Grid>

            <Grid container item xs={12} alignContent="flex-start"></Grid>

            <Grid container item xs spacing={1}></Grid>

            <Grid container item xs={12}>
              <Grid container item xs spacing={1}>
                {tags &&
                  tags.map((tag, index) => {
                    if (index > 2) return '';

                    return (
                      <React.Fragment>
                        <Grid item xs="auto">
                          <Typography component="span">{tag}</Typography>
                        </Grid>

                        {index < tags.length - 1 && index < 2 && (
                          <Grid item xs="auto">
                            <Divider orientation="vertical" />
                          </Grid>
                        )}
                      </React.Fragment>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
};

export default BusinessSearchResult;

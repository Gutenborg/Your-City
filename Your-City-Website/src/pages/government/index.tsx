import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { APIBusiness, getBusinesses } from '../../api';
import BusinessSearchForm from './pageComponents/BusinessSearchForm';
import BusinessSearchResult from './pageComponents/BusinessSearchResult';

export const GovernmentPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<APIBusiness[]>([]);

  const { search: locationQuery } = useLocation();
  const { push } = useHistory();

  const urlQuery = parse(locationQuery, { arrayFormat: 'none' });
  const searchParam = typeof urlQuery.query === 'string' ? urlQuery.query : '';

  useEffect(() => {
    searchBusinesses(searchParam);
  }, [searchParam]);

  const searchBusinesses = async (query?: string) => {
    const apiResults = await getBusinesses(query);

    if (apiResults) setSearchResults(apiResults);
  };

  const handleSearch = (newSearchTerm: string) => {
    searchBusinesses(newSearchTerm);
    push(`/business?query=${newSearchTerm}`);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2">Search for Businesses</Typography>
      </Grid>

      <Grid item xs={12}>
        <BusinessSearchForm onSearch={handleSearch} defaultValue={searchParam} />
      </Grid>

      <Grid item xs={12}>
        <Typography>{searchResults.length} Results</Typography>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        {searchResults.map(({ category, _id, name }) => (
          <Grid item xs={12} key={_id}>
            <BusinessSearchResult category={category} id={_id} name={name} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default GovernmentPage;

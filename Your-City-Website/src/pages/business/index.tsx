import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import { APIBusiness, APICategory, getBusinesses } from '../../api';
import BusinessSearchForm from './pageComponents/BusinessSearchForm';
import BusinessSearchResult from './pageComponents/BusinessSearchResult';

export const BusinessPage: React.FC = () => {
  // State Hooks
  const [searchResults, setSearchResults] = useState<APIBusiness[]>([]);

  // Utility Hooks
  const { search: locationQuery } = useLocation();
  const { push } = useHistory();

  const urlQuery = parse(locationQuery, { arrayFormat: 'none' });
  const searchParam = typeof urlQuery.query === 'string' ? urlQuery.query : '';

  useEffect(() => {
    searchBusinesses(searchParam);
  }, [searchParam]);

  const searchBusinesses = async (query?: string, category?: APICategory) => {
    const apiResults = await getBusinesses(query, category);

    if (apiResults) setSearchResults(apiResults);
  };

  const handleSearch = (newSearchTerm: string, category: APICategory | 'all') => {
    searchBusinesses(newSearchTerm, category && category !== 'all' ? category : undefined);
    let newUrl = `/business?query=${newSearchTerm}`;
    if (category && category !== 'all') newUrl = newUrl + `&category=${category}`;
    push(newUrl);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2">Find a Local Business</Typography>
      </Grid>

      <Grid item xs={12}>
        <BusinessSearchForm onSearch={handleSearch} defaultValue={searchParam} />
      </Grid>

      <Grid item xs={12}>
        <Typography>
          {searchResults.length} {searchResults.length > 1 ? 'Businesses Found' : 'Business Found'}
        </Typography>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        {searchResults.map((business) => (
          <Grid item xs={12} key={business._id}>
            <BusinessSearchResult {...business} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default BusinessPage;

import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface BusinessSearchResultProps {
  defaultValue?: string;
  onSearch: (query: string) => void;
}

export const BusinessSearchResult: React.FC<BusinessSearchResultProps> = ({ defaultValue, onSearch }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: {
      search: defaultValue,
    },
  });

  const handleSearch: SubmitHandler<{ search: string }> = ({ search }) => {
    onSearch(search);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid container spacing={2}>
        <Grid item xs>
          <TextField
            label="Search"
            name="search"
            placeholder="Search for a business..."
            inputRef={register}
            type="search"
          />
        </Grid>

        <Grid item xs="auto">
          <Button type="submit" size="large" color="secondary">
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessSearchResult;

import React from 'react';
import { Grid, IconButton, makeStyles, TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { APICategory } from '../../../api';

export interface BusinessSearchFormProps {
  defaultValue?: string;
  onSearch: (query: string, category: APICategory | 'all') => void;
}

export type BusinessSearchFormInputs = 'search' | 'category';

const useStyles = makeStyles(({ palette }) => ({
  containedIconButton: {
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
    '&:hover': {
      backgroundColor: palette.secondary.dark,
    },
  },
}));

export const BusinessSearchForm: React.FC<BusinessSearchFormProps> = ({ defaultValue, onSearch }) => {
  // Utility Hooks
  const { containedIconButton } = useStyles();
  const { handleSubmit, register } = useForm({
    defaultValues: {
      search: defaultValue,
    },
  });

  const handleSearch: SubmitHandler<Record<BusinessSearchFormInputs, string>> = ({ category, search }) => {
    onSearch(search, category as APICategory | 'all');
  };

  const categories: APICategory[] = [
    'retail',
    'restaurant',
    'service',
    'distribution',
    'supply',
    'manufacturing',
    'financial',
    'legal',
    'health',
  ];

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs="auto">
          <TextField label="Category" name="category" inputRef={register} select defaultValue="all">
            <option value="all">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </TextField>
        </Grid>

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
          <IconButton className={containedIconButton} type="submit">
            <Search />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default BusinessSearchForm;

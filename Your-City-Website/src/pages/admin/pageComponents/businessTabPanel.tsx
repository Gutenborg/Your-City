import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { APIBusiness, APICategory, getBusinesses } from '../../../api';
import { DropdownIconButton, DropdownItem } from '../../../components';
import CreateBusinessDialog from './createBusinessDialog';
import DeleteBusinessDialog from './deleteBusinessDialog';
import EditBusinessDialog from './editBusinessDialog';

const BusinessTabPanel: React.FC = (props) => {
  // State Hooks
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [businesses, setBusinesses] = useState<APIBusiness[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<APIBusiness>();

  // Utility Hooks
  const { search: locationQuery } = useLocation();

  const urlQuery = parse(locationQuery, { arrayFormat: 'none' });
  const searchParam = typeof urlQuery.query === 'string' ? urlQuery.query : '';

  useEffect(() => {
    searchBusinesses(searchParam);
  }, [searchParam]);

  const searchBusinesses = async (query?: string, category?: APICategory) => {
    const apiResults = await getBusinesses(query, category);

    if (apiResults) setBusinesses(apiResults);
  };

  const handleDialogClose = (dialog: 'create' | 'delete' | 'edit') => {
    if (dialog === 'create') setCreateDialogOpen(false);
    else if (dialog === 'delete') setDeleteDialogOpen(false);
    else if (dialog === 'edit') setEditDialogOpen(false);

    setSelectedBusiness(undefined);
  };

  const handleDialogOpen = (dialog: 'create' | 'delete' | 'edit', business?: APIBusiness) => {
    if (dialog === 'create') setCreateDialogOpen(true);
    else if (dialog === 'delete') setDeleteDialogOpen(true);
    else if (dialog === 'edit') setEditDialogOpen(true);

    setSelectedBusiness(business);
  };

  const handleCreate = (success: boolean) => {
    if (success) {
      handleDialogClose('create');
      searchBusinesses();
    }
  };

  const handleDelete = (success: boolean) => {
    if (success) {
      handleDialogClose('delete');
      searchBusinesses();
    }
  };

  const handleEdit = (success: boolean) => {
    if (success) {
      handleDialogClose('edit');
      searchBusinesses();
    }
  };

  const rows: GridRowsProp = businesses.map((business) => ({ id: business._id, ...business }));

  const columns: GridColDef[] = [
    {
      field: 'name',
      flex: 1,
      headerName: 'Name',
    },
    {
      field: 'category',
      flex: 1,
      headerName: 'Category',
    },
    {
      field: 'contact',
      flex: 1,
      valueGetter: (row) => row.row?.contact?.phone || '--',
      headerName: 'Phone Number',
    },
    {
      field: 'id',
      flex: 0,
      align: 'center',
      renderCell: (row) => (
        <DropdownIconButton>
          <DropdownItem onClick={() => handleDialogOpen('edit', row.row as APIBusiness)}>Edit</DropdownItem>
          <DropdownItem onClick={() => handleDialogOpen('delete', row.row as APIBusiness)}>Delete</DropdownItem>
        </DropdownIconButton>
      ),
      headerName: 'Edit',
    },
  ];

  return (
    <Grid container spacing={1}>
      <Grid item xs />

      <Grid item xs="auto">
        <Button onClick={() => handleDialogOpen('create')} color="secondary">
          Add New Business
        </Button>
      </Grid>

      <Grid item xs={12}>
        <DataGrid rows={rows} columns={columns} autoHeight />
      </Grid>

      <Grid item xs={12}>
        <CreateBusinessDialog
          open={createDialogOpen}
          onClose={() => handleDialogClose('create')}
          onCreate={handleCreate}
        />

        {selectedBusiness && (
          <React.Fragment>
            <DeleteBusinessDialog
              open={deleteDialogOpen}
              onClose={() => handleDialogClose('delete')}
              businessId={selectedBusiness._id}
              businessName={selectedBusiness.name}
              onDelete={handleDelete}
            />

            <EditBusinessDialog
              open={editDialogOpen}
              onClose={() => handleDialogClose('edit')}
              onEdit={handleEdit}
              business={selectedBusiness}
            />
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
};

export default BusinessTabPanel;

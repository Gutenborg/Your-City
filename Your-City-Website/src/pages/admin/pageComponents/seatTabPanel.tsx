import React, { useEffect, useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import { parse } from 'query-string';
import { useLocation } from 'react-router-dom';
import { APISeat, getSeats } from '../../../api';
import { DropdownIconButton, DropdownItem } from '../../../components';
import CreateSeatDialog from './createSeatDialog';
import DeleteSeatDialog from './deleteSeatDialog';
import EditSeatDialog from './editSeatDialog';

const SeatTabPanel: React.FC = (props) => {
  // State Hooks
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [seats, setSeats] = useState<APISeat[]>([]);
  const [selectedSeat, setSelectedSeat] = useState<APISeat>();

  // Utility Hooks
  const { search: locationQuery } = useLocation();

  const urlQuery = parse(locationQuery, { arrayFormat: 'none' });
  const searchParam = typeof urlQuery.query === 'string' ? urlQuery.query : '';

  useEffect(() => {
    searchSeats(searchParam);
  }, [searchParam]);

  const searchSeats = async (query?: string) => {
    const apiResults = await getSeats(query);

    if (apiResults) setSeats(apiResults);
  };

  const handleDialogClose = (dialog: 'create' | 'delete' | 'edit') => {
    if (dialog === 'create') setCreateDialogOpen(false);
    else if (dialog === 'delete') setDeleteDialogOpen(false);
    else if (dialog === 'edit') setEditDialogOpen(false);

    setSelectedSeat(undefined);
  };

  const handleDialogOpen = (dialog: 'create' | 'delete' | 'edit', seat?: APISeat) => {
    if (dialog === 'create') setCreateDialogOpen(true);
    else if (dialog === 'delete') setDeleteDialogOpen(true);
    else if (dialog === 'edit') setEditDialogOpen(true);

    setSelectedSeat(seat);
  };

  const handleCreate = (success: boolean) => {
    if (success) {
      handleDialogClose('create');
      searchSeats();
    }
  };

  const handleDelete = (success: boolean) => {
    if (success) {
      handleDialogClose('delete');
      searchSeats();
    }
  };

  const handleEdit = (success: boolean) => {
    if (success) {
      handleDialogClose('edit');
      searchSeats();
    }
  };

  const rows: GridRowsProp = seats.map((seat) => ({ id: seat._id, ...seat }));

  const columns: GridColDef[] = [
    {
      field: 'name',
      flex: 1,
      headerName: 'Name',
    },
    {
      field: 'branch',
      flex: 1,
      headerName: 'Branch',
    },
    {
      field: 'level',
      flex: 1,
      headerName: 'Level',
    },
    {
      field: 'id',
      flex: 0,
      align: 'center',
      renderCell: (row) => (
        <DropdownIconButton>
          <DropdownItem onClick={() => handleDialogOpen('edit', row.row as APISeat)}>Edit</DropdownItem>
          <DropdownItem onClick={() => handleDialogOpen('delete', row.row as APISeat)}>Delete</DropdownItem>
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
          Add New Seat
        </Button>
      </Grid>

      <Grid item xs={12}>
        <DataGrid rows={rows} columns={columns} autoHeight />
      </Grid>

      <Grid item xs={12}>
        <CreateSeatDialog open={createDialogOpen} onClose={() => handleDialogClose('create')} onCreate={handleCreate} />

        {selectedSeat && (
          <React.Fragment>
            <DeleteSeatDialog
              open={deleteDialogOpen}
              onClose={() => handleDialogClose('delete')}
              seatId={selectedSeat._id}
              seatName={selectedSeat.name}
              onDelete={handleDelete}
            />

            <EditSeatDialog
              open={editDialogOpen}
              onClose={() => handleDialogClose('edit')}
              onEdit={handleEdit}
              seat={selectedSeat}
            />
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
};

export default SeatTabPanel;

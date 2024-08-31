import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, InputAdornment, AppBar, Toolbar, IconButton, Collapse, List, 
  ListItem, ListItemText
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, DeleteOutlined as DeleteIcon, 
  Save as SaveIcon, Close as CancelIcon } from '@mui/icons-material';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'Bus ID', width: 100 },
  { field: 'busNumber', headerName: 'Bus Number', width: 140 },
  { field: 'startPoint', headerName: 'Start Point', width: 140 },
  { field: 'endPoint', headerName: 'End Point', width: 140 },
  { field: 'date', headerName: 'Date', width: 140 },
  { field: 'departureTime', headerName: 'Departure Time', width: 160 },
  { field: 'arrivalTime', headerName: 'Arrival Time', width: 160 },
  { field: 'totalSeats', headerName: 'Total Seats', width: 140 },
  { field: 'availableSeats', headerName: 'Available Seats', width: 160 },
  { field: 'distance', headerName: 'Distance (km)', width: 140 },
];

export default function BusPanel() {
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newRow, setNewRow] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/bus/')
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  };

  const handleEditClick = (id) => {
    const row = rows.find((row) => row.id === id);
    if (row) {
      setNewRow(row);
      setEditId(id);
      setIsEditMode(true);
      setDialogOpen(true);
    } else {
      console.error(`Row with id ${id} not found`);
    }
  };

  const handleAddClick = () => {
    setNewRow({});
    setIsEditMode(false);
    setDialogOpen(true);
  };

  const handleSaveClick = () => {
    if (isEditMode) {
      axios.put(`http://localhost:8081/bus/update/${editId}`, newRow)
        .then((response) => {
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === editId ? response.data : row))
          );
          alert('Bus updated successfully!');
          handleCancelClick();
        })
        .catch((error) => {
          console.error('There was an error updating the bus!', error);
        });
    } else {
      axios.post('http://localhost:8081/bus/', newRow)
        .then((response) => {
          setRows((prevRows) => [...prevRows, response.data]);
          alert('Bus added successfully!');
          handleCancelClick();
        })
        .catch((error) => {
          console.error('There was an error adding the bus!', error);
        });
    }
  };

  const handleConfirmDelete = (id) => {
    axios.delete(`http://localhost:8081/bus/${id}`)
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        alert('Bus deleted successfully!');
      })
      .catch((error) => {
        console.error('There was an error deleting the bus!', error);
        fetchData(); // Re-fetch data in case of failure to ensure UI consistency
      });
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
    setEditId(null);
    setNewRow({});
  };

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
  }, []);

  const toggleRowExpansion = (id) => {
    setExpandedRowId(expandedRowId === id ? null : id);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddClick}
          sx={{ mb: 2 }}
        >
          Add Bus
        </Button>

        {rows.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No buses available.
          </Typography>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                {columns.map((col) => (
                  <th key={col.field} scope="col">{col.headerName}</th>
                ))}
                <th scope="col">Bookings</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr>
                    <td>{row.id}</td>
                    <td>{row.busNumber}</td>
                    <td>{row.startPoint}</td>
                    <td>{row.endPoint}</td>
                    <td>{row.date}</td>
                    <td>{row.departureTime}</td>
                    <td>{row.arrivalTime}</td>
                    <td>{row.totalSeats}</td>
                    <td>{row.availableSeats}</td>
                    <td>{row.distance}</td>
                    <td>
                      <Button onClick={() => toggleRowExpansion(row.id)}>
                        {expandedRowId === row.id ? 'Hide' : 'Show'} Bookings
                      </Button>
                    </td>
                    <td>
                      <Button color="primary" onClick={() => handleEditClick(row.id)} startIcon={<EditIcon />} sx={{ mr: 1 }}>
                        Edit
                      </Button>
                      <Button color="secondary" onClick={() => handleConfirmDelete(row.id)} startIcon={<DeleteIcon />}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={columns.length + 2}>
                      <Collapse in={expandedRowId === row.id}>
                        <List component="nav" aria-label="bookings">
                          {row.bookings && row.bookings.length > 0 ? (
                            row.bookings.map((booking) => (
                              <ListItem key={booking.id}>
                                <ListItemText primary={`Booking ID: ${booking.id}, Details: ${booking.bookingDetails}`} />
                              </ListItem>
                            ))
                          ) : (
                            <ListItem>
                              <ListItemText primary="No bookings available." />
                            </ListItem>
                          )}
                        </List>
                      </Collapse>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        )}
      </Box>

      <Dialog
        fullScreen
        open={dialogOpen}
        onClose={handleCancelClick}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCancelClick}
              aria-label="close"
            >
              <CancelIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {isEditMode ? 'Edit Bus' : 'Add Bus'}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="busNumber"
            label="Bus Number"
            type="text"
            fullWidth
            variant="standard"
            value={newRow.busNumber || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="startPoint"
            label="Start Point"
            type="text"
            fullWidth
            variant="standard"
            value={newRow.startPoint || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="endPoint"
            label="End Point"
            type="text"
            fullWidth
            variant="standard"
            value={newRow.endPoint || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="standard"
            value={newRow.date || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="departureTime"
            label="Departure Time"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={newRow.departureTime || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="arrivalTime"
            label="Arrival Time"
            type="datetime-local"
            fullWidth
            variant="standard"
            value={newRow.arrivalTime || ''}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="totalSeats"
            label="Total Seats"
            type="number"
            fullWidth
            variant="standard"
            value={newRow.totalSeats || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="availableSeats"
            label="Available Seats"
            type="number"
            fullWidth
            variant="standard"
            value={newRow.availableSeats || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="distance"
            label="Distance (km)"
            type="number"
            fullWidth
            variant="standard"
            value={newRow.distance || ''}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">km</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, InputAdornment, AppBar, Toolbar, IconButton, Collapse, List, 
  ListItem, ListItemText
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, DeleteOutlined as DeleteIcon, 
  Save as SaveIcon, Close as CancelIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

const columns = [
  { field: 'id', headerName: 'User ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 140 },
  { field: 'email', headerName: 'Email', width: 220 },
  { field: 'password', headerName: 'Password', width: 140 },
  { field: 'phoneNumber', headerName: 'Phone Number', width: 160 },
];

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [editId, setEditId] = useState(null);
  const [newRow, setNewRow] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8081/user/')
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
      setDialogOpen(true);
    } else {
      console.error(`Row with id ${id} not found`);
    }
  };

  const handleSaveClick = () => {
    if (editId) {
      axios.put(`http://localhost:8081/user/update/${editId}`, newRow)
        .then((response) => {
          setRows((prevRows) =>
            prevRows.map((row) => (row.id === editId ? response.data : row))
          );
          alert('User updated successfully!');
          handleCancelClick();
        })
        .catch((error) => {
          console.error('There was an error updating the user!', error);
        });
    } else {
      axios.post('http://localhost:8081/user/', newRow)
        .then((response) => {
          setRows((prevRows) => [...prevRows, response.data]);
          alert('User added successfully!');
          handleCancelClick();
        })
        .catch((error) => {
          console.error('There was an error adding the user!', error);
        });
    }
  };

  const handleConfirmDelete = (id) => {
    // Optimistically update the UI by removing the row immediately
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));

    // Perform the actual delete request
    axios.delete(`http://localhost:8081/user/${id}`)
      .then(() => {
        alert('User deleted successfully!');
      })
      .catch((error) => {
        console.error('There was an error deleting the user!', error);
        fetchData(); // Re-fetch data in case of failure to ensure UI consistency
      });
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
    setAddDialogOpen(false);
    setEditId(null);
    setNewRow({}); // Clear the form state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRow((prevRow) => ({ ...prevRow, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          onClick={() => setAddDialogOpen(true)}
          sx={{ mb: 2 }}
        >
          Add User
        </Button>

        {rows.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No users available.
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
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.password}</td>
                    <td>{row.phoneNumber}</td>
                    <td>
                      <Button onClick={toggleRowExpansion(row.id)}>{expandedRowId === row.id ? 'Hide' : 'Show'} Bookings</Button>
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

      {/* Dialog for adding/editing user */}
      <Dialog
        fullScreen
        open={dialogOpen || addDialogOpen}
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
              {editId ? 'Edit User' : 'Add User'}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newRow.name || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={newRow.email || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="standard"
            value={newRow.password || ''}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            fullWidth
            variant="standard"
            value={newRow.phoneNumber || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelClick}>Cancel</Button>
          <Button onClick={handleSaveClick}>{editId ? 'Save Changes' : 'Add User'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

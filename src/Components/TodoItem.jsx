import React, { useContext, useState } from 'react';
import { Box, Checkbox, IconButton, Typography, Chip, Stack, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Card, CardContent, Fade } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TodoContext } from '../App';

const priorities = ['Low', 'Medium', 'High'];
const categories = ['Work', 'Personal', 'Shopping', 'Other'];

const priorityColors = {
  High: 'error',
  Medium: 'secondary',
  Low: 'default',
};

const TodoItem = ({ todo }) => {
  const { setTodos } = useContext(TodoContext);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ ...todo });

  const handleToggleComplete = () => {
    setTodos((prev) => prev.map((t) => t.id === todo.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = () => {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  };

  const handleEditOpen = () => {
    setEditData({ ...todo });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTodos((prev) => prev.map((t) => t.id === todo.id ? { ...t, ...editData } : t));
    setEditOpen(false);
  };

  return (
    <Fade in={true}>
      <Card
        variant="outlined"
        sx={{
          mb: 2,
          borderRadius: 5,
          boxShadow: todo.completed ? 0 : '0 4px 32px 0 rgba(127,90,240,0.10)',
          opacity: todo.completed ? 0.6 : 1,
          background: todo.completed ? 'rgba(127,90,240,0.07)' : 'rgba(255,255,255,0.85)',
          border: todo.completed ? '2px solid #2cb67d33' : '2px solid #7f5af033',
          transition: 'box-shadow 0.25s, transform 0.2s, border 0.2s',
          '&:hover': {
            boxShadow: '0 8px 40px 0 rgba(127,90,240,0.18)',
            transform: 'translateY(-2px) scale(1.015)',
            border: '2.5px solid #7f5af0',
          },
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Checkbox
              checked={todo.completed}
              onChange={handleToggleComplete}
              sx={{
                color: '#7f5af0',
                '&.Mui-checked': {
                  color: '#2cb67d',
                  animation: 'pop 0.3s',
                },
                '@keyframes pop': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.3)' },
                  '100%': { transform: 'scale(1)' },
                },
              }}
            />
            <Box flex={1}>
              <Typography variant="h6" sx={{ textDecoration: todo.completed ? 'line-through' : 'none', fontWeight: 800, letterSpacing: '-0.5px', color: todo.completed ? 'success.main' : 'primary.main', transition: 'color 0.2s' }}>{todo.title}</Typography>
              {todo.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{todo.description}</Typography>}
              <Stack direction="row" spacing={1} mt={1}>
                {todo.dueDate && <Chip label={`Due: ${todo.dueDate}`} size="small" color="warning" sx={{ fontWeight: 600, bgcolor: '#fffbe6', color: '#7f5af0', borderRadius: 2, px: 1.2 }} />}
                {todo.category && <Chip label={todo.category} size="small" color="info" sx={{ fontWeight: 600, bgcolor: '#e0f7fa', color: '#2cb67d', borderRadius: 2, px: 1.2 }} />}
                {todo.priority && <Chip label={todo.priority} size="small" color={priorityColors[todo.priority] || 'default'} sx={{ fontWeight: 600, bgcolor: todo.priority === 'High' ? '#ffebee' : todo.priority === 'Medium' ? '#ede7f6' : '#f4f7fa', color: todo.priority === 'High' ? '#d32f2f' : todo.priority === 'Medium' ? '#7f5af0' : '#222', borderRadius: 2, px: 1.2 }} />}
              </Stack>
            </Box>
            <Tooltip title="Edit">
              <IconButton onClick={handleEditOpen} color="primary" sx={{ bgcolor: '#f4f7fa', borderRadius: 2, mr: 0.5, '&:hover': { bgcolor: '#ede7f6' } }}><EditIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton onClick={handleDelete} color="error" sx={{ bgcolor: '#f4f7fa', borderRadius: 2, '&:hover': { bgcolor: '#ffebee' } }}><DeleteIcon /></IconButton>
            </Tooltip>
          </Stack>
        </CardContent>
        {/* Edit Dialog */}
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>Edit To-Do</DialogTitle>
          <Box component="form" onSubmit={handleEditSubmit}>
            <DialogContent>
              <Stack spacing={2}>
                <TextField
                  label="Title"
                  name="title"
                  value={editData.title}
                  onChange={handleEditChange}
                  required
                  fullWidth
                />
                <TextField
                  label="Description"
                  name="description"
                  value={editData.description}
                  onChange={handleEditChange}
                  multiline
                  rows={2}
                  fullWidth
                />
                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={editData.dueDate}
                  onChange={handleEditChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={editData.category}
                    label="Category"
                    onChange={handleEditChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    name="priority"
                    value={editData.priority}
                    label="Priority"
                    onChange={handleEditChange}
                  >
                    {priorities.map((pri) => (
                      <MenuItem key={pri} value={pri}>{pri}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Card>
    </Fade>
  );
};

export default TodoItem; 
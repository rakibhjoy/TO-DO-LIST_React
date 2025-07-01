import React, { useState, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Stack, Slide, Box } from '@mui/material';
import { TodoContext } from '../App';

const categories = ['Work', 'Personal', 'Shopping', 'Other'];
const priorities = ['Low', 'Medium', 'High'];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TodoForm = ({ open, handleClose }) => {
  const { setTodos } = useContext(TodoContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('Medium');

  useEffect(() => {
    if (!open) {
      setTitle('');
      setDescription('');
      setDueDate('');
      setCategory('');
      setPriority('Medium');
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setTodos((prev) => [
      {
        id: Date.now(),
        title,
        description,
        dueDate,
        category,
        priority,
        completed: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          borderRadius: 5,
          p: 2,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(12px)',
          boxShadow: 8,
          minWidth: { xs: '90vw', sm: 400 },
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle sx={{ fontWeight: 800, color: 'primary.main', textAlign: 'center', letterSpacing: '-1px' }}>Add New To-Do</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
              autoFocus
              inputProps={{ style: { fontSize: 18, borderRadius: 16 } }}
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={2}
              fullWidth
              inputProps={{ style: { borderRadius: 16 } }}
            />
            <TextField
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ style: { borderRadius: 16 } }}
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priority}
                label="Priority"
                onChange={(e) => setPriority(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                {priorities.map((pri) => (
                  <MenuItem key={pri} value={pri}>{pri}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary" sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary" sx={{ borderRadius: 3, px: 4, fontWeight: 700 }}>Add</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TodoForm; 
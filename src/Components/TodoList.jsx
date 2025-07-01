import React, { useContext, useState } from 'react';
import { Box, Typography, TextField, Stack, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { TodoContext } from '../App';
import TodoItem from './TodoItem';

const categories = ['All', 'Work', 'Personal', 'Shopping', 'Other'];
const priorities = ['All', 'Low', 'Medium', 'High'];

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priority, setPriority] = useState('All');

  const filtered = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase()) || (todo.description && todo.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = category === 'All' || todo.category === category;
    const matchesPriority = priority === 'All' || todo.priority === priority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={2}>
        <TextField
          label="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={e => setCategory(e.target.value)}>
            {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select value={priority} label="Priority" onChange={e => setPriority(e.target.value)}>
            {priorities.map(pri => <MenuItem key={pri} value={pri}>{pri}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
      {filtered.length === 0 ? (
        <Typography color="text.secondary" align="center" mt={4}>No to-dos found.</Typography>
      ) : (
        filtered.map(todo => <TodoItem key={todo.id} todo={todo} />)
      )}
    </Box>
  );
};

export default TodoList; 
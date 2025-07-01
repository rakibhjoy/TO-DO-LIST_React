import React, { useContext } from 'react';
import { Button, Stack } from '@mui/material';
import { TodoContext } from '../App';

const BulkActions = () => {
  const { todos, setTodos } = useContext(TodoContext);

  const markAllComplete = () => {
    setTodos(todos.map(todo => ({ ...todo, completed: true })));
  };

  const deleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <Stack direction="row" spacing={2} mb={2}>
      <Button variant="outlined" color="primary" onClick={markAllComplete} disabled={todos.length === 0}>
        Mark All Complete
      </Button>
      <Button variant="outlined" color="error" onClick={deleteCompleted} disabled={todos.every(todo => !todo.completed)}>
        Delete Completed
      </Button>
    </Stack>
  );
};

export default BulkActions; 
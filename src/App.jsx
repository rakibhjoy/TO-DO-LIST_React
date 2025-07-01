import React, { useState, useMemo, createContext } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, Paper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ThemeToggle from './Components/ThemeToggle';
import TodoForm from './Components/TodoForm';
import BulkActions from './Components/BulkActions';
import TodoList from './Components/TodoList';
// Import other components (to be created)
// import TodoList from './Components/TodoList';
// import TodoForm from './Components/TodoForm';
// import CategoryFilter from './Components/CategoryFilter';
// import PriorityFilter from './Components/PriorityFilter';
// import BulkActions from './Components/BulkActions';

// Context for global state
export const TodoContext = createContext();

const getInitialTodos = () => {
  const saved = localStorage.getItem('todos');
  return saved ? JSON.parse(saved) : [];
};

function App() {
  const [todos, setTodos] = useState(getInitialTodos());
  const [themeMode, setThemeMode] = useState('light');
  const [formOpen, setFormOpen] = useState(false);

  // Persist todos to localStorage
  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
      primary: { main: '#2563eb' }, // Modern blue
      secondary: { main: '#10b981' }, // Teal accent
      warning: { main: '#FFD600' }, // Yellow for FAB
      background: {
        default:
          themeMode === 'dark'
            ? '#181c24'
            : '#f3f4f6',
        paper:
          themeMode === 'dark'
            ? '#23272f'
            : '#fff',
      },
    },
    shape: {
      borderRadius: 0, // No border radius
    },
    typography: {
      fontFamily: 'Inter, Roboto, Arial, sans-serif',
      h4: {
        fontWeight: 800,
        letterSpacing: '-1px',
      },
    },
    shadows: [
      'none',
      '0px 4px 24px rgba(0,0,0,0.08)',
      ...Array(23).fill('0px 4px 24px rgba(0,0,0,0.08)')
    ],
  }), [themeMode]);

  const contextValue = {
    todos,
    setTodos,
    themeMode,
    setThemeMode,
  };

  // Set background gradient based on theme
  const backgroundGradient = themeMode === 'dark'
    ? 'linear-gradient(180deg, #181c24 0%, #23272f 40%, #2563eb 100%)'
    : 'linear-gradient(180deg, #fff 0%, #f3f4f6 30%, #2563eb 80%, #a259ff 100%)';

  return (
    <TodoContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{
          minHeight: '100vh',
          width: '100vw',
          background: backgroundGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 6,
          position: 'relative',
        }}>
          <Container maxWidth="sm" disableGutters>
            <Paper elevation={3} sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 0, // No border radius
              boxShadow: 2,
              minWidth: { xs: '92vw', sm: 440 },
              maxWidth: 520,
              mx: 'auto',
              background: theme.palette.background.paper,
            }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                  To-Do List
                </Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton
                    aria-label="add"
                    onClick={() => setFormOpen(true)}
                    sx={{
                      backgroundColor: '#FFD600',
                      color: '#23272f',
                      '&:hover': {
                        backgroundColor: '#ffe066',
                      },
                      boxShadow: 2,
                    }}
                  >
                    <AddIcon fontSize="medium" />
                  </IconButton>
                  <ThemeToggle />
                </Box>
              </Box>
              <BulkActions />
              <TodoList />
              {/* <CategoryFilter /> */}
              {/* <PriorityFilter /> */}
            </Paper>
            <TodoForm open={formOpen} handleClose={() => setFormOpen(false)} />
          </Container>
        </Box>
      </ThemeProvider>
    </TodoContext.Provider>
  );
}

export default App;
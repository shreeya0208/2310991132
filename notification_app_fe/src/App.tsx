import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { AllNotifications } from './page/AllNotifications';
import { PriorityNotifications } from './page/PriorityNotifications';
import { logger } from './api/logger';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3b82f6' },
    success: { main: '#10b981' },
    background: {
      default: '#0f172a',
      paper: '#1e293b'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
});

function App() {
  useEffect(() => {
    logger.info('page', 'application loaded with mui');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Notification Center
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={RouterLink} to="/" color="inherit">All Notifications</Button>
              <Button component={RouterLink} to="/priority" color="error" variant="outlined">Priority</Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

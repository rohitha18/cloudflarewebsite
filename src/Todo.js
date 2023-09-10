import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  Divider,
  Select,
  MenuItem,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { red, yellow, green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    secondary: {
      main: '#FFC107',
    },
    error: {
      main: red[500],
    },
    warning: {
      main: yellow[500],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  spacing: 4,
});

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [category, setCategory] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (!taskText.trim()) return;

    const newTask = {
      text: taskText,
      priority: getPriorityValue(priority), // Store priority as an integer
      dueDate,
      dueTime,
      category,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
    setPriority('Low');
    setDueDate('');
    setDueTime('');
    setCategory('');
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const getPriorityValue = (priorityText) => {
    switch (priorityText) {
      case 'High':
        return 3;
      case 'Medium':
        return 2;
      case 'Low':
      default:
        return 1;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper elevation={3} style={{ padding: theme.spacing(4), width: '80%', maxWidth: '600px', backgroundColor: 'white' }}>
        <Typography variant="h4" align="center" style={{ color: theme.palette.primary.main, marginBottom: theme.spacing(3) }}>
        To-Do List
        </Typography>
        <TextField
          label="Add a task"
          variant="outlined"
          fullWidth
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          style={{ marginBottom: theme.spacing(2) }}
        />
        <TextField
          select
          label="Priority"
          variant="outlined"
          fullWidth
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ marginBottom: theme.spacing(2) }}
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <div style={{ display: 'flex', marginBottom: theme.spacing(2) }}>
          <div style={{ marginRight: theme.spacing(2), flex: 1 }}>
            <TextField
              type="date"
              variant="outlined"
              fullWidth
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              type="time"
              variant="outlined"
              fullWidth
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>
        <TextField
          label="Category"
          variant="outlined"
          fullWidth
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginBottom: theme.spacing(2) }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTask}
          style={{ marginBottom: theme.spacing(2), color: 'white' }}
        >
          Add Task
        </Button>
        <Divider style={{ margin: `${theme.spacing(2)}px 0` }} />
        <TextField
          label="Search tasks"
          variant="outlined"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: theme.spacing(2) }}
        />
        <List>
          {tasks
            .filter(
              (task) =>
                task.text.includes(searchText) &&
                (category ? task.category === category : true)
            )
            .map((task, index) => (
              <ListItem key={index} style={{ backgroundColor: '#F9F9F9', borderRadius: '4px', marginBottom: theme.spacing(2) }}>
                <ListItemText
                  primary={task.text}
                  secondary={`${task.dueDate} ${task.dueTime}`}
                  style={{ flex: 3 }}
                />
                <ListItemText
                  primary={task.priority}
                  style={{
                    color:
                      task.priority === 3
                        ? theme.palette.error.main
                        : task.priority === 2
                        ? theme.palette.warning.main
                        : theme.palette.success.main,
                    fontWeight: 'bold',
                  }}
                />
                <ListItemText primary={task.category} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteTask(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="due-date">
                    <CalendarTodayIcon />
                  </IconButton>
                  {task.priority === 3 && <ArrowUpwardIcon style={{ color: theme.palette.error.main }} />} {/* High priority */}
                  {task.priority === 2 && <ArrowForwardIcon style={{ color: theme.palette.warning.main }} />} {/* Medium priority */}
                  {task.priority === 1 && <ArrowDownwardIcon style={{ color: theme.palette.success.main }} />} {/* Low priority */}
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Paper>
    </ThemeProvider>
  );
}

export default TodoList;

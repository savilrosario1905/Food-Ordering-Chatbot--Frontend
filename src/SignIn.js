import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from './authApi';
import { Typography, TextField, Button, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#795548', 
    },
    background: {
      default: '#f0ebe1', 
    },
  },
  Button:{
    color: '#3e2723',
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h5: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#3e2723', 
    },
    body2: {
      color: '#5d4037', 
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

function SignIn() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(formData);
      console.log(response);

    
      if ( response.message ) {
        navigate('/menu');
      } else {
        setError('Invalid username or password. Please try again.');
        setTimeout(() => {
          setError('');
        }, 3000); 
      }
    } catch (error) {
      console.error(error);
      setError('Invalid username or password. Please try again.');
      setTimeout(() => {
        setError('');
      }, 3000); 
    }
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5" gutterBottom align="center">Sign In</Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color='primary'
                style={{marginTop:10,marginBottom:10}}
           
            >
              Sign In
            </Button>
          </form>
          <Grid container justify="center">
            <Grid item>
              <Typography variant="body2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
            </Grid>
          </Grid>
          {error && (
            <Grid container justify="center">
              <Grid item>
                <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
                  {error}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn;

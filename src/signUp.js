import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from './authApi';
import { Typography, TextField, Button, Container, Grid, Paper } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#795548', 
    },
    secondary: {
      main: '#f50057', 
    },
    background: {
      default: '#f0ebe1', 
    },
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
  },
  paper: {
    padding: theme.spacing(4),
    width: '100%',
    maxWidth: 400,
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
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
}));

function SignUp() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h5" gutterBottom>Sign Up</Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            color="primary"
            style={{marginTop:10,marginBottom:10}}
            >
              Sign Up
            </Button>
          </form>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" className={classes.link}>Already have an account? Sign In</Link>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;

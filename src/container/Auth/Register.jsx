import React from 'react';

import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar/NavBar';
import { registerWithEmailAndPassword } from '../../server/firebase.service';
import { useHistory } from 'react-router-dom';
export default function Register() {
  const [userformstate, setUserFormState] = React.useState({
    confirmpassword: {
      value: '',
      flag: false,
    },
  });
  const history = useHistory();

  const onFormSubmit = async () => {
    if (
      userformstate['firstname'] != '' &&
      userformstate['email'] != '' &&
      userformstate['password'] != '' &&
      userformstate['confirmpassword']['flag']
    ) {
      try {
        await registerWithEmailAndPassword(userformstate);
        alert(
          'successfully created and please Login again with new credentials'
        );
        history.push('/login');
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    } else {
      alert('required');
    }
  };

  const onHandleUserForm = (e) => {
    setUserFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onHandleCheckPassword = (e) => {
    if (e.target.value === userformstate['password']) {
      setUserFormState((prevState) => ({
        ...prevState,
        [e.target.name]: { value: e.target.value, flag: true },
      }));
    } else {
      setUserFormState((prevState) => ({
        ...prevState,
        [e.target.name]: { value: e.target.value, flag: false },
      }));
    }
  };

  return (
    <div>
      <NavBar />
      <Grid sx={{ height: '50vh' }} container>
        <Grid
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          item
          lg={6}
          sm={6}
          xs={12}
        >
          <Typography variant="h4" component="div">
            Sign Up
          </Typography>
          <Typography variant="h6" component="div">
            We do not share your personal details with anyone
          </Typography>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          item
          lg={6}
          sm={6}
          xs={12}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '100%', lg: '50%', sm: '50%' },
            }}
          >
            <TextField
              required
              id="standard-basic"
              label="First Name"
              variant="standard"
              margin="dense"
              name="firstname"
              value={userformstate['firstname']}
              onChange={onHandleUserForm}
            />
            <TextField
              id="standard-basic"
              label="Last Name"
              margin="dense"
              variant="standard"
              name="lastname"
              value={userformstate['lastname']}
              onChange={onHandleUserForm}
            />
            <TextField
              required
              id="standard-basic"
              error={
                !String(userformstate['email'])
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
              }
              label="Email"
              margin="dense"
              variant="standard"
              name="email"
              value={userformstate['email']}
              onChange={onHandleUserForm}
            />
            <TextField
              required
              id="standard-basic"
              type="password"
              label="Password"
              margin="dense"
              variant="standard"
              name="password"
              value={userformstate['password']}
              onChange={onHandleUserForm}
            />
            <TextField
              required
              type="password"
              error={!userformstate['confirmpassword']['flag']}
              id="standard-basic"
              label="Confirm Password"
              name="confirmpassword"
              value={userformstate['confirmpassword']['value']}
              margin="dense"
              variant="standard"
              onChange={onHandleCheckPassword}
            />
            <Button sx={{ backgroundColor: 'red' }} onClick={onFormSubmit}>
              Sign up
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

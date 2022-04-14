import React from 'react';

import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavBar from '../../components/NavBar/NavBar';
import { logInWithEmailAndPassword } from '../../server/firebase.service';
import { useHistory } from 'react-router-dom';
export default function Login() {
  const [userformstate, setUserFormState] = React.useState({
    confirmpassword: {
      value: '',
      flag: false,
    },
  });
  const history = useHistory();

  const onFormSubmit = async () => {
    if (userformstate['email'] != '' && userformstate['password'] != '') {
      try {
        const resp = await logInWithEmailAndPassword(
          userformstate['email'],
          userformstate['password']
        );

        localStorage.setItem('auth', JSON.stringify(resp.user.accessToken));
        if (resp.user.accessToken) {
          history.push('/');
        }
        console.log('resp', resp);
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
            Login
          </Typography>
          <Typography variant="h6" component="div">
            Get access to your order,wishlist and Recommendations
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
              label="Email"
              variant="standard"
              margin="dense"
              sx={{ width: '100%' }}
              error={
                !String(userformstate['email'])
                  .toLowerCase()
                  .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                  )
              }
              name="email"
              value={userformstate['email']}
              onChange={onHandleUserForm}
            />
            <TextField
              sx={{ width: '100%' }}
              id="standard-basic"
              label="Password"
              margin="dense"
              error={!userformstate['password']}
              type="password"
              variant="standard"
              name="password"
              value={userformstate['password']}
              onChange={onHandleUserForm}
            />
            <Button sx={{ backgroundColor: 'red' }} onClick={onFormSubmit}>
              Login
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

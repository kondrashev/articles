import '@styles/AuthorizationForm.scss';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { checkAuthorization } from '../../store/actions/userActions';

const Authorization: React.FC = () => {
  const { values, setValues } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getUser = useAppSelector((state) => state.user.user);
  useEffect(() => {
    if (getUser.login === 'none') {
      navigate('/panel');
    } else if (getUser.role === 'ADMIN') {
      navigate('/admin');
    } else if (getUser.role === 'AUTHOR') {
      navigate('/author');
    } else {
      navigate('/panel');
    }
  }, [getUser.login]);
  const onChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      login: e.target.value,
    });
  };
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      password: e.target.value,
    });
  };
  const authorizationCheck = () => {
    dispatch(checkAuthorization(values));
  };
  const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      authorizationCheck();
    }
  };
  const aothorization = () => {
    dispatch(checkAuthorization(values));
  };
  const visiblePassword = () => {
    setValues({
      ...values,
      isShowPassword: !values.isShowPassword,
    });
  };

  return (
    <Box className="formAuthorization">
      <TextField
        id="outlined-search"
        value={values.login}
        disabled={false}
        label="Login"
        variant="outlined"
        className="fields"
        onChange={onChangeLogin}
      />
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          disabled={values.login ? false : true}
          value={values.password}
          type={values.isShowPassword ? 'text' : 'password'}
          onChange={onChangePassword}
          className="fields"
          onKeyPress={onPressKey}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={visiblePassword} onMouseDown={console.log} edge="end">
                {values.isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        disableElevation
        variant="contained"
        color="primary"
        className="fields"
        onClick={aothorization}
        disabled={values.password ? false : true}
      >
        Authorization
      </Button>
    </Box>
  );
};
export default Authorization;

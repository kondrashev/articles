import '@styles/AuthorizationForm';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { checkAuthorization } from '../../store/actions/userActions';

const Authorization: React.FC = () => {
  const { values, setValues } = useAppContext();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getUser: IUser = useAppSelector((state) => state.user.user);

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

  useEffect(() => {
    setValues({
      ...values,
      loginForm: getUser.login,
      errorForm: values.loginForm === 'none' ? true : false,
      errorMessage: 'Incorrect login or password!',
    });
  }, [values.showErrorForm]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const visiblePassword = () => {
    setValues({
      ...values,
      isShowPassword: !values.isShowPassword,
    });
  };

  const authorizationCheck = (data: IUser) => {
    setValues({
      ...values,
      showErrorForm: !values.showErrorForm,
    });
    const newData = { ...data, registration: values.registration };
    dispatch(checkAuthorization(newData));
  };

  const handleChangeSwitch = () => {
    setValues({
      ...values,
      registration: !values.registration,
    });
  };

  return (
    <form className="formAuthorization" onSubmit={handleSubmit(authorizationCheck)}>
      <TextField
        {...register('login', {
          required: true,
          minLength: 3,
          pattern: /^[A-Za-z]+$/i,
        })}
        id="outlined-search"
        label="Login"
        variant="outlined"
        className="fields"
      />
      {errors?.login?.type === 'required' && <InputLabel className="inputErrorLogin">This field is required!</InputLabel>}
      {errors?.login?.type === 'minLength' && <InputLabel className="inputErrorLogin">Username cannot be less 3 characters!</InputLabel>}
      {errors?.login?.type === 'pattern' && <InputLabel className="inputErrorLogin">Alphabetical characters only!</InputLabel>}
      <FormControl>
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          {...register('password', {
            required: true,
            minLength: 2,
          })}
          id="outlined-adornment-password"
          type={values.isShowPassword ? 'text' : 'password'}
          className="fields"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" onClick={visiblePassword} edge="end">
                {values.isShowPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <FormControlLabel
        className="switch"
        control={<Switch onChange={handleChangeSwitch} />}
        label={!values.registration ? 'Authorization' : 'Registration'}
      />
      {errors?.password?.type === 'required' && <InputLabel className="inputErrorPassword">This field is required!</InputLabel>}
      {errors?.password?.type === 'minLength' && <InputLabel className="inputErrorPassword">Password cannot be less 2 characters!</InputLabel>}
      <Button disableElevation type="submit" variant="contained" color="primary" className="fields">
        {!values.registration ? 'Authorization' : 'Registration'}
      </Button>
      {values.errorForm && (
        <Alert
          className="formAlert"
          onClose={() => {
            setValues({
              ...values,
              errorForm: false,
              errorMessage: '',
              loginForm: 'none',
            });
          }}
        >
          {values.errorMessage}
        </Alert>
      )}
    </form>
  );
};

export default Authorization;

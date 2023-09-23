import '@styles/AuthorizationForm';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { IUser } from '../../../constants/constants';
import { useAppContext } from '../../context/context';

const Test: React.FC = () => {
  const { values, setValues } = useAppContext();
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
      {errors?.password?.type === 'required' && <InputLabel className="inputErrorPassword">This field is required!</InputLabel>}
      {errors?.password?.type === 'minLength' && <InputLabel className="inputErrorPassword">Password cannot be less 2 characters!</InputLabel>}
      <Button disableElevation type="submit" variant="contained" color="primary" className="fields">
        Authorization
      </Button>
    </form>
  );
};

export default Test;

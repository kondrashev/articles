import React, { createContext, ReactNode, useContext, useState } from 'react';
interface IProps {
  children: ReactNode;
}
interface IValuesTypes {
  login: string;
  password: string;
  isShowPassword: boolean;
  showErrorForm: boolean;
  errorForm: boolean;
  errorMessage: string;
  loginForm: string;
}
interface IValues {
  values: IValuesTypes;
  setValues: (values) => void;
}

export const AppContext = createContext<null | IValues>(null);
export const useAppContext = () => useContext(AppContext);

const AppContextPovider: React.FC<IProps> = ({ children }) => {
  const [values, setValues] = useState({
    login: '',
    password: '',
    isShowPassword: false,
    showErrorForm: false,
    errorForm: false,
    errorMessage: '',
    loginForm: '',
  });
  const value = {
    values,
    setValues,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextPovider;

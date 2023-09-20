import React, { createContext, ReactNode, useContext, useState } from 'react';
interface IProps {
  children: ReactNode;
}
interface IValuesTypes {
  login: string;
  password: string;
  isShowPassword: boolean;
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
  });
  const value = {
    values,
    setValues,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextPovider;

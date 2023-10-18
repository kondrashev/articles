import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';
interface IProps {
  children: ReactNode;
}
interface IValuesTypes {
  isShowPassword: boolean;
  showErrorForm: boolean;
  errorForm: boolean;
  errorMessage: string;
  loginForm: string;
  registration: boolean;
  titleEditor: string;
  textEditor: string;
  isShowEditor: boolean;
  isEditEditor: boolean;
  articleId: number;
}
interface IValues {
  values: IValuesTypes;
  setValues: (values: IValuesTypes) => void;
  refEditor;
}

export const AppContext = createContext<null | IValues>(null);
export const useAppContext = () => useContext(AppContext);

const AppContextPovider: React.FC<IProps> = ({ children }) => {
  const [values, setValues] = useState({
    isShowPassword: false,
    showErrorForm: false,
    errorForm: false,
    errorMessage: '',
    loginForm: '',
    registration: false,
    titleEditor: '',
    textEditor: '',
    isShowEditor: false,
    isEditEditor: false,
    articleId: 0,
  });
  const refEditor = useRef(0);
  const value = {
    values,
    setValues,
    refEditor,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextPovider;

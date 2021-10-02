import React  from "react"
import StudentRollContextProvider from "shared/context/StudentRoll/studentRollContext"
import AppContextProvider from 'shared/context/App/appContext';

// Combine the list of context providers.
const contextProviders: any = [
  AppContextProvider,
  StudentRollContextProvider
];

const ContextProvider: React.FC = ({children}) => {
  return contextProviders.reduce((memo: any, ContextProvider: any) => {
    return <ContextProvider>{memo}</ContextProvider>;
  }, children);
};

export default ContextProvider;

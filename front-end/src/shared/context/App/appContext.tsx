import React, { createContext, useContext, useReducer } from "react"
import { appStateReducer } from "shared/context/App/appReducer"
import { AppReducerState } from "shared/context/App/appContext.type"

const initialState: AppReducerState = {
  data: undefined,
  loadState: "loading",
  error: undefined
}

export interface AppContextType {
  state: any,
  dispatch: React.Dispatch<any>
}
const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null
});

const AppContextProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  const contextValue = {state, dispatch};
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppContextProvider;

// Usage of the app context.
export const useAppContext = () => useContext(AppContext);

import React, { useReducer } from 'react'
import { reducer } from './reducer'

// Init states
const initialState = {
  selectedLocation: '',
  selectedYear: 0
}

// Create context
export const AppContext = React.createContext({})

export const ContextProvider: React.FC = ({ children }): React.ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

import React, { createContext, useContext, useReducer } from "react";
import { studentRollReducer } from "shared/context/StudentRoll/studentRollReducer";
import { Roll } from "shared/models/roll";
import { StudentContext } from "shared/context/StudentRoll/studentRollContext.type"

// Initial count of the student's attendance.
const initialState: Roll = {
  id: 1,
  name: "roll",
  completed_at: new Date(),
  student_roll_states: []
};

// Create context to store attendance roll.
const StudentRollContext = createContext<StudentContext>({
  state: initialState,
  dispatch: () => null
});

const StudentRollContextProvider: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(studentRollReducer, initialState);

  const contextValue = {state, dispatch};
  return <StudentRollContext.Provider value={contextValue}>{children}</StudentRollContext.Provider>
}

export default StudentRollContextProvider;

// Usage of the context.
export const useStudentRollContext = () => useContext(StudentRollContext);

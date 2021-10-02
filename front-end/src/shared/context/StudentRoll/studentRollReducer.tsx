import { Roll } from "shared/models/roll"

export const studentRollReducer = (prevState: Roll, action: any) => {
  switch (action.type) {
    case 'CHANGE_STUDENT_ROLL':
      // Clone the prev state.
      const prevStudentRollAssign = [...prevState.student_roll_states];
      // Find the index.
      const elementsIndex = prevStudentRollAssign.findIndex(element =>
        element.student_id == action.payload.student_id )

      prevStudentRollAssign[elementsIndex] = {
        ...prevStudentRollAssign[elementsIndex],
        roll_state: action.payload.roll_state
      }

      // Return the updates student-assign-roll.
      return {
        ...prevState,
        student_roll_states: elementsIndex === -1 ?
          [...prevState.student_roll_states, action.payload] : [...prevStudentRollAssign]
      };

    default:
      console.log("NO SUCH ACTION", action);
      return prevState
  }
}

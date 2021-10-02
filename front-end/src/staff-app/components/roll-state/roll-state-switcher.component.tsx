import React, { useState } from "react"
import { RolllStateType } from "shared/models/roll"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { useStudentRollContext } from "shared/context/StudentRoll/studentRollContext"

interface Props {
  initialState?: RolllStateType
  size?: number
  studentId: number
}
export const RollStateSwitcher: React.FC<Props> = ({ initialState = "unmark", size = 40, studentId }) => {
  const [rollState, setRollState] = useState(initialState)

  // Get student-assign-roll state.
  const {dispatch} = useStudentRollContext();

  const nextState = () => {
    const states: RolllStateType[] = ["present", "late", "absent"]
    if (rollState === "unmark" || rollState === "absent") return states[0]
    const matchingIndex = states.findIndex((s) => s === rollState)
    return matchingIndex > -1 ? states[matchingIndex + 1] : states[0]
  }

  const onClick = () => {
    const next = nextState()
    setRollState(next)
    dispatch({
      type: 'CHANGE_STUDENT_ROLL',
      payload: {
        student_id: studentId,
        roll_state: next
      }}
    );
  }

  return <RollStateIcon type={rollState} size={size} onClick={onClick} />
}

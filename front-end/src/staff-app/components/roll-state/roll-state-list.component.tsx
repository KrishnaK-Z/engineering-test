import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { RollStateIcon } from "staff-app/components/roll-state/roll-state-icon.component"
import { FontWeight, Spacing } from "shared/styles/styles"
import { RolllStateType } from "shared/models/roll"
import { useAppContext } from "shared/context/App/appContext"
import { useStudentRollContext } from "shared/context/StudentRoll/studentRollContext"

interface Props {
  stateList: StateList[]
  size?: number
}
export const RollStateList: React.FC<Props> = ({ stateList, size = 14 }) => {
  // Get data from the store.
  const {dispatch} = useAppContext();
  const {state: {student_roll_states}} = useStudentRollContext();

  const onClick = (type: ItemType) => {
    // Filter student ids with selected roll.
    const studentIds = student_roll_states.filter(item => item.roll_state === type).map(item => item.student_id);
    dispatch({type: "filter", filterItem: studentIds});
  }

  return (
    <S.ListContainer>
      {stateList.map((s, i) => {
        if (s.type === "all") {
          return (
            <S.ListItem key={i}>
              <FontAwesomeIcon icon="users" size="sm" style={{ cursor: "pointer" }} onClick={() => onClick(s.type)} />
              <span>{s.count}</span>
            </S.ListItem>
          )
        }

        return (
          <S.ListItem key={i}>
            <RollStateIcon type={s.type} size={size} onClick={() => onClick(s.type)} />
            <span>{s.count}</span>
          </S.ListItem>
        )
      })}
    </S.ListContainer>
  )
}

const S = {
  ListContainer: styled.div`
    display: flex;
    align-items: center;
  `,
  ListItem: styled.div`
    display: flex;
    align-items: center;
    margin-right: ${Spacing.u2};

    span {
      font-weight: ${FontWeight.strong};
      margin-left: ${Spacing.u2};
    }
  `,
}

interface StateList {
  type: ItemType
  count: number
}

type ItemType = RolllStateType | "all"

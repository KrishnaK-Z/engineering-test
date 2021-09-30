import React, { useState, useEffect, useCallback } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/ButtonBase"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [sortStudentsData, getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

  useEffect(() => {
    void getStudents();
  }, [getStudents])

  // Tool Bar action handlers.
  const onToolbarAction = useCallback((action: ToolbarAction, value?: any) => {
    if (action === "roll") {
      // Toggle b/w roll modes.
      setIsRollMode(rollMode => !rollMode);
    }

    if (action === 'sort') {
      void sortStudentsData(value)
    }
  }, [sortStudentsData])

  // Attendance overlay CTA handlers.
  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} />

        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {data.students.map((s: any) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onItemClick }) => {
  const [sortOption, setSortOption] = useState("");

  // Handle the sort option change.
  const handleChange = (event: any) => {
    setSortOption(event.target.value);
  };

  // Triggers on sort option change.
  useEffect(() => {
    onItemClick("sort", sortOption);
  }, [sortOption])

  return (
    <S.ToolbarContainer>
      <div onClick={() => onItemClick("sort")}>
        <Box style={{minWidth: 120}}>
          <FormControl fullWidth>
            <InputLabel id="sort-name-select-label">Sort</InputLabel>
            <Select
              labelId="sort-name-select-label"
              id="sort-name-select"
              value={sortOption}
              label="Names"
              onChange={handleChange}
            >
              <MenuItem value='first_name'>First Name</MenuItem>
              <MenuItem value='last_name'>Last Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>Search</div>
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
  ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
  Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
    }
  `,
}

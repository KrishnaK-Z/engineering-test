import { Roll } from "shared/models/roll"

export const studentRollReducer = (prevState: Roll, action: any) => {
  switch (action.type) {
    default:
      console.log("NO SUCH ACTION", action);
      return prevState
  }
}

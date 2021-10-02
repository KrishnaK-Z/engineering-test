import { Roll } from "shared/models/roll";
import React from "react"

export interface StudentContext {
  state: Roll,
  dispatch: React.Dispatch<any>
}

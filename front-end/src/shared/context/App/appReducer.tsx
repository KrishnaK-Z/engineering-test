import { FieldName, sortItems } from "shared/helpers/sort-files"
import { ResponseError } from "shared/interfaces/http.interface"

export const appStateReducer = (state: any, action: ReducerAction) => {
  switch (action.type) {
    case "loading":
      return { ...state, loadState: "loading", error: undefined }
    case "success":
      return { ...state, loadState: "loaded", error: undefined, data: action.result }
    case "error":
      return { ...state, loadState: "error", error: action.error }
    case "sort":
      return {
        ...state,
        loadState: "loaded",
        error: undefined,
        data: {...state.data, students: sortItems(state.data?.students, action.fieldName, action.isAsecOrder)}
      };
  }
}

type ReducerAction = { type: "success"; result: any } | { type: "error"; error: ResponseError }
  | { type: "loading" } | { type: "sort", fieldName: FieldName, isAsecOrder: boolean }

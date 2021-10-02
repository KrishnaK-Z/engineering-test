import { FieldName, sortItems } from "shared/helpers/sort-files"
import { ResponseError } from "shared/interfaces/http.interface"
import { get, LocalStorageKey } from "shared/helpers/local-storage"

export const appStateReducer = (state: any, action: ReducerAction) => {
  // Get students data from the storage.
  const studentsFromStorage: any = get(LocalStorageKey.students);

  switch (action.type) {
    case "loading":
      return { ...state, loadState: "loading", error: undefined }
    case "success":
      return { ...state, loadState: "loaded", error: undefined, data: action.result }
    case "error":
      return { ...state, loadState: "error", error: action.error }
    case "filter":
      const filteredData = studentsFromStorage.filter((student: any) => action.filterItem.includes(student.id));
      return {
        ...state,
        data: {...state.data, students: action.filterItem.length ? filteredData : studentsFromStorage}
      };
    case "search":
      return {
        ...state,
        data: {...state.data, students: action.searchResult}
      }
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
  | {type: "filter", filterItem: any} | {type: "search", searchResult: any}

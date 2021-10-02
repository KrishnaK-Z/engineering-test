import { useCallback } from "react"
import { ApiResponse } from "shared/interfaces/http.interface"
import { RollInput } from "shared/models/roll"
import { getHomeboardStudents } from "api/get-homeboard-students"
import { getActivities } from "api/get-activities"
import { saveActiveRoll } from "api/save-active-roll"
import { FieldName } from "shared/helpers/sort-files"
import { useAppContext } from "shared/context/App/appContext"

interface Options {
  url: Endpoint
  initialLoadState?: LoadState
}

export function useApi<ReturnType = {}>({ url }: Options) {
  const {state, dispatch} = useAppContext();

  // Initial call to load students data.
  const callApi = useCallback(
    async (params?: object) => {
      dispatch({ type: "loading" })

      function process(result: ApiResponse<ReturnType>) {
        if (result.success) {
          dispatch({ type: "success", result: result })
        } else if (result.error) {
          dispatch({ type: "error", error: result.error })
        }
      }

      switch (url) {
        case "get-homeboard-students":
          return getHomeboardStudents().then(process)
        case "get-activities":
          return getActivities().then(process)
        case "save-roll":
          return saveActiveRoll(params as RollInput).then(process)
      }
    },
    [url]
  );

  // Dispatch sorting action.
  const sortStudentsData = useCallback((fieldName: FieldName, isAsecOrder: boolean) => {
    fieldName !== undefined && dispatch({ type: "sort", fieldName, isAsecOrder });
  }, [])

  return [sortStudentsData, callApi, state.data, state.loadState, state.error] as const
}

/* use-api options interfaces */
export type Endpoint = "get-homeboard-students" | "save-roll" | "get-activities"
export type LoadState = "unloaded" | "loading" | "loaded" | "error"

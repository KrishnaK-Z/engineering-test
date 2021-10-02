import { LoadState } from "shared/hooks/use-api"
import { ResponseError } from "shared/interfaces/http.interface"

export interface AppReducerState {
  data: any | undefined
  loadState: LoadState
  error: ResponseError | undefined
}

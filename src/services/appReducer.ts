import { State, Actions } from "./../types/commons";

export default function appReducer(state: State, action: Actions): State {
  if (action.type === "DISPLAY_SEARCH") {
    return { ...state, displaySearch: action.payload };
  }
  return state;
}

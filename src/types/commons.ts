export type State = {
  displaySearch: boolean;
};

type ActionTypes = {
  DISPLAY_SEARCH: "DISPLAY_SEARCH";
};
type Action = {
  type: keyof ActionTypes;
};
export interface displaySearch extends Action {
  payload: boolean;
}

export type Actions = displaySearch;

export interface AppContext extends State {
  dispatch: React.Dispatch<Actions>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  displaySearch: boolean;
}

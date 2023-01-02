import { Action, Reducer } from "@core/store";
import { AddFilm, FILM_ACTION_TYPE } from "./action";

interface HomeData {
  navigationId: number;
  page: number;
  filmBlock: any[];
}
interface Section {
  navigationId: number;
  ids: any[];
}

interface PagesData {
  [key: string]: Partial<HomeData>;
}
interface SectionData {
  [key: string]: Partial<Section>;
}

interface FilmState {
  filmData: PagesData;
  section: SectionData;
  loading: boolean;
}

const initialState: FilmState = {
  filmData: {},
  section: {},
  loading: false,
};
const reducer: Reducer<FilmState, Action<FILM_ACTION_TYPE, AddFilm>> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FILM_ACTION_TYPE.ADD: {
      const navigationId = action.payload!.navigationId;
      if (state.filmData[navigationId]) {
        state.filmData[navigationId].filmBlock?.push(
          ...action.payload!.filmBlock
        );
        state.filmData[navigationId].page = action.payload?.page;
      } else {
        state.filmData[navigationId] = action.payload!;
      }
      return state;
    }
    default:
      return state;
  }
};
export const namespace = "FILM_STORE";
export default { namespace, reducer };

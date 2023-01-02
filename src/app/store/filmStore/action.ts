import { Action } from "@core/store";

export enum FILM_ACTION_TYPE {
  ADD = "ADD_FILM",
  REMOVE = "REMOVE_FILM",
}

export interface AddFilm {
  navigationId: number;
  filmBlock: any[];
  page: number;
}

export const addFilm = ({
  navigationId,
  filmBlock,
  page,
}: AddFilm): Action<FILM_ACTION_TYPE.ADD, AddFilm> => {
  return {
    type: FILM_ACTION_TYPE.ADD,
    payload: { navigationId, filmBlock, page },
  };
};

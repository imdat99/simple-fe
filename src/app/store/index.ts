import createStore from "@core/store";
import filmReducer from "./filmStore/reducer";

export const store = createStore(filmReducer.reducer);

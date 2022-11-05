import { createSelector } from "@ngrx/store";
import { AppStateInterface } from "../interfaces/appState.interface";

export const selectFeature = (state: AppStateInterface) => state.items;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const itemsSelector = createSelector(
  selectFeature,
  (state) => state.items
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

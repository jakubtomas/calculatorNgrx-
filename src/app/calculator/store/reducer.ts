import { createReducer, on } from "@ngrx/store";
import { ItemsStateInterface } from "../interfaces/ItemsState.interface";
import * as ItemsActions from "./actions"


export const initialState: ItemsStateInterface = {
  isLoading: false,
  items: [
    { id: 1, value: '0' },
    { id: 2, value: '0' },
    { id: 3, value: '0' }
  ],
  error: null
}

export const ItemsReducer = createReducer(
  initialState,
  on(ItemsActions.getCalculatorData, (state) => ({ ...state, isLoading: true })),

  on(ItemsActions.addItem,
    (state, content) => ({
      ...state,
      isLoading: false,
      items: [...state.items, content.item]
    })),

);

import { createAction, props } from '@ngrx/store';
import { Item } from '../interfaces/item.interface';

export const getCalculatorData = createAction('[Calculator] Get Calculator Data');

export const addItem = createAction(
  '[Calculator] Add item',
  props<{ item: Item }>(),
)

import { Item } from "./item.interface";

export interface ItemsStateInterface {
  isLoading: boolean;
  items: Item[];
  error: string | null;
}

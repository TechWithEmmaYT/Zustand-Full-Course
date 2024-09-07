import { StateCreator } from "zustand";

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};
type CartState = {
  cartItems: CartItem[];
  total: number;
};
type CartActions = {
  addItem: (item: CartItem) => void;
  getItemById: (productId: number) => CartItem | undefined; // Fix: Change productId to number
  removeItem: (id: number) => void;
  //setTotal: (total: number) => void;
  reset: () => void;
};

export type CartSlice = CartState & CartActions;

const initialState = {
  cartItems: [],
  total: 0,
};

export const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (
  set,
  get
) => ({
  ...initialState,
  addItem: (item: CartItem) =>
    set((state: CartState) => ({
      cartItems: [...state.cartItems, item],
    })),

  getItemById: (itemId: number) =>
    get().cartItems.find((item) => item.id === itemId),

  removeItem: (id: number) =>
    set((state: CartState) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id), // Fix: Use correct state property `cartItems`
    })),

  setTotal: (val: number) => set(() => ({ total: val })),
  reset: () => set(() => initialState),
});

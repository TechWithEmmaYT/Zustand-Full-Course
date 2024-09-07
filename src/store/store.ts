// import { create } from "zustand";

// type State = {
//   count: number;
// };

// type Actions = {
//   increment: () => void;
//   decrement: () => void;
//   reset: () => void;
// };
// export const useCountStore = create<State & Actions>((set) => ({
//   count: 0, //initial state
//   increment: () => set((state) => ({ count: state.count + 1 })),
//   decrement: () => set((state) => ({ count: state.count - 1 })),
//   reset: () => set({ count: 0 }),
// }));

import { create } from "zustand";
import { createUserSlice } from "./user.slice";
import { createCartSlice } from "./cart.slice";
import { StoreType } from "@/types/store.type";
import { immer } from "zustand/middleware/immer";
import createSelectors from "./selectors";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";

// export const useStore = create<StoreType>()(
//   immer((...a) => ({
//     ...createUserSlice(...a),
//     ...createCartSlice(...a),
//   }))
// );

export const useStoreBase = create<StoreType>()(
  devtools(
    persist(
      subscribeWithSelector(
        immer((...a) => ({
          ...createUserSlice(...a),
          ...createCartSlice(...a),
        }))
      ),
      {
        name: "session-storage", // Name of the item in localStorage (or sessionStorage)
        getStorage: () => sessionStorage, // (optional) by default it's localStorage
      }
    )
  )
);

useStoreBase.subscribe(
  (state) => state.cartItems,
  (cartItems) => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    useStoreBase.setState({ total });
  }
);

export const useStore = createSelectors(useStoreBase);

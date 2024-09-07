import { StateCreator } from "zustand";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  isEmailVerified: boolean;
  address: {
    houseAddress: string;
    street: {
      name: string;
    };
    city: string;
  };
  occupation: string;
};

type UserState = {
  user: User | null;
  //new added  for async support
  isLoading: boolean;
  error: string | null;
};

type UserActions = {
  setUser: (user: User) => void;
  updateStreet: (streetName: string) => void;
  resetUser: () => void;
  //new added  for async support
  fetchUser: () => void;
};

export type UserSlice = UserState & UserActions;

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  user: null as User | null,

  //new added  for async support
  isLoading: false,
  error: null,

  setUser: (user: User) => set({ user }),

  updateStreet: (streetName) =>
    set((state) => {
      // with ['zustand/immer', never]
      if (state.user) {
        state.user.address.street.name = streetName;
      }
    }),

  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      const user: Partial<User> = {
        id: data.id,
        name: data.name,
        username: data.username,
        email: data.email,
        address: {
          houseAddress: "fetched address",
          street: {
            name: data.address.street,
          },
          city: data.address.city,
        },
      };
      console.log(data);
      // Extract relevant data from API response
      set((state) => ({
        user: {
          ...state.user,
          ...user,
        },
        isLoading: false,
      }));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      set({
        error: "Failed to fetch user",
        isLoading: false,
      });
    }
  },

  resetUser: () => set(() => ({ user: null })),

  // updateStreet: (streetName: string) =>
  //   set((state: UserState) => ({
  //     user: state.user
  //       ? {
  //           ...state.user,
  //           address: {
  //             ...state.user.address,
  //             street: {
  //               ...state.user.address.street,
  //               name: streetName,
  //             },
  //           },
  //         }
  //       : null,
  //   })),
});

// export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
//   set
// ) => ({
//   user: null as User | null,
//   setUser: (user: User) => set({ user }),
//   updateStreet: (streetName: string) =>
//     set((state: UserState) => ({
//       user: state.user
//         ? {
//             ...state.user,
//             address: {
//               ...state.user.address,
//               street: {
//                 ...state.user.address.street,
//                 name: streetName,
//               },
//             },
//           }
//         : null,
//     })),
// });

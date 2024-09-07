import { Fragment } from "react";
import { useStore } from "./store/store";
import { useShallow } from "zustand/react/shallow";

function App() {
  //const { count, increment, decrement, reset } = useCountStore();

  // const user = useStore((state) => state.user);
  // const setUser = useStore((state) => state.setUser);
  // const updateStreet = useStore((state) => state.updateStreet);

  // const cartItems = useStore((state) => state.cartItems);
  // const total = useStore((state) => state.total);
  // const addItem = useStore((state) => state.addItem);
  // const removeItem = useStore((state) => state.removeItem);

  // using selectors
  const user = useStore.use.user();
  const setUser = useStore.use.setUser();
  const updateStreet = useStore.use.updateStreet();
  const resetUser = useStore.use.resetUser();
  const fetchUser = useStore.use.fetchUser();

  const cartItems = useStore.use.cartItems();
  const total = useStore.use.total();
  const addItem = useStore.use.addItem();
  const removeItem = useStore.use.removeItem();
  const resetCart = useStore.use.reset();

  const { name, username, streetName, isLoading } = useStore(
    useShallow((state) => ({
      name: state.user?.name,
      username: state.user?.username,
      streetName: state.user?.address.street.name,

      isLoading: state.isLoading,
    }))
  );

  const itemsToAdd = [
    { id: 1, name: "Apple", quantity: 3, price: 1.99 },
    { id: 2, name: "Banana", quantity: 2, price: 0.99 },
    { id: 3, name: "Orange", quantity: 5, price: 0.79 },
  ];

  // useEffect(() => {
  //   const unsubscribe = useStore.subscribe(
  //     (state) => state.cartItems,
  //     (cartItems) => {
  //       const total = cartItems.reduce(
  //         (acc, item) => acc + item.price * item.quantity,
  //         0
  //       );
  //       useStore.setState({ total });
  //     }
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center h-scree">
        <div className="p-8 rounded shadow-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Zustand Slice Pattern</h1>
          <h2 className="text-xl font-semibold mb-2">User Info</h2>
          <div className="flex gap-4">
            <span>{name}</span>
            <span>{username}</span>
            <span>{streetName}</span>
          </div>
          <pre className="text-left mb-4">{JSON.stringify(user, null, 2)}</pre>
          <button
            onClick={() =>
              setUser({
                id: 1,
                name: "John",
                username: "johndoe",
                email: "john@example.com",
                isEmailVerified: true,
                address: {
                  houseAddress: "123 Main St",
                  street: {
                    name: "First Street",
                  },
                  city: "Metropolis",
                },
                occupation: "Engineer",
              })
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2
            mb-2"
          >
            Set User
          </button>
          <button
            onClick={() => updateStreet("Second Street")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 ml-2"
          >
            Update Street Name
          </button>
          <button
            onClick={fetchUser}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 ml-2 disabled:opacity-30"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Async Add"}
          </button>
          <button
            onClick={resetUser}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
          >
            Reset User
          </button>
          <br />
          <br />
          <h2 className="text-xl font-semibold mt-6 mb-2">Shopping Cart</h2>
          {/* Display Total */}
          <h5 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h5>
          <pre className="text-left mb-4">
            {JSON.stringify(cartItems, null, 2)}
          </pre>
          {itemsToAdd.map((item) => (
            <button
              key={item.id}
              onClick={() => addItem(item)}
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 mb-2 disabled:opacity-30"
              disabled={
                cartItems.find((cartItem) => cartItem.id === item.id)
                  ? true
                  : false
              }
            >
              Add {item.name}
            </button>
          ))}
          {cartItems?.length > 0 && (
            <button
              onClick={resetCart}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
            >
              Clear Cart
            </button>
          )}{" "}
          {/* {Loop through cart} */}
          {cartItems.map((item) => (
            <div key={item.id} className="mb-2 flex items-center">
              <span className="mr-2">
                {item.name} (x{item.quantity}) - ${item.price}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <br />
        </div>
      </div>

      {/* {Counter App} */}
      {/* // <div className="w-full flex items-center justify-center h-screen">
    //   <div className="flex items-center justify-center">
    //     <div className="p-8 rounded shadow-lg text-center">
    //       <h1 className="text-2xl font-bold mb-4">Zustand Counter</h1>
    //       <div className="text-3xl mb-4">{count}</div>
    //       <div className="flex space-x-4 justify-center">
    //         <button
    //           onClick={decrement}
    //           className="px-4 py-2 bg-red-500 text-white"
    //         >
    //           Decrement
    //         </button>
    //         <button
    //           onClick={increment}
    //           className="px-4 py-2 bg-blue-500 text-white"
    //         >
    //           Increment
    //         </button>
    //       </div>
    //       <br />
    //       <br />
    //       <button
    //         onClick={reset}
    //         className="px-4 py-2 bg-black text-white rounded"
    //       >
    //         {" "}
    //         reset
    //       </button>
    //     </div>
    //   </div>
    // </div> */}
    </Fragment>
  );
}

export default App;

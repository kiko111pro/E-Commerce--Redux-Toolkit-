import React from "react";
import { useDispatch } from "react-redux";
import {
  incrementProductQuantity,
  decrementProductQuantity,
} from "../features/Product/product.reducer";

function CartButton({ id, alreadyInCart }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row items-center border border-slate-400 w-20">
      <div
        onClick={() => dispatch(decrementProductQuantity(id))}
        className="bg-red-400 flex-1 w-full flex-grow text-center font-extrabold cursor-pointer hover:bg-red-500 "
      >
        -
      </div>
      <div className="w-full flex-1 text-center font-semibold">
        {alreadyInCart.quantity}
      </div>
      <div
        onClick={() => dispatch(incrementProductQuantity(id))}
        className="bg-green-500 flex-1 w-full text-center font-extrabold cursor-pointer hover:bg-green-600"
      >
        +
      </div>
    </div>
  );
}

export default CartButton;

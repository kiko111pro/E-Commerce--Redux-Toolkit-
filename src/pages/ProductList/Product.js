import React, { memo } from "react";
import { truncateString } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import { addProduct } from "../../features/Product/product.reducer";
import CartButton from "../../components/CartButton";

function Product({ image, title, description, price, id, alreadyInCart }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-row p-2 px-4 justify-between items-end border-slate-200 border-b">
      <div className="flex w-11/12 py-3 items-end">
        <div className="flex ">
          <img
            src={image}
            className=" rounded  h-auto object-contain border-gray-400 p-2 border-2 w-28"
            alt=""
          />
          <div className="flex-col ml-2 justify-between flex w-1/2">
            <div className="column whitespace-normal ">
              <p className="md:text-xl mb-1 font-semibold">{title}</p>
              <p className="sm:text-xs md:text-sm overflow-hidden">
                {truncateString(description, 100)}
              </p>
            </div>
            <div className="flex gap-4 flex-row">
              <p className="font-bold">Rs. {price}</p>
              <p className="line-through ">Rs.11</p>
            </div>
          </div>
        </div>
      </div>
      {alreadyInCart ? (
        <CartButton id={id} alreadyInCart={alreadyInCart} />
      ) : (
        <button
          onClick={() =>
            dispatch(addProduct({ image, title, description, price, id }))
          }
          className="w-20 h-10 rounded-md hover:bg-green-500 font-semibold bg-green-400"
        >
          ADD
        </button>
      )}
    </div>
  );
}

//To avoid re-rendering of the whole product-list
export default memo(Product);

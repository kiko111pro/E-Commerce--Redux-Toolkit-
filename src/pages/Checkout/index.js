import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import CartButton from "../../components/CartButton";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../features/Product/product.reducer";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productsInCart, totalAmount } = useSelector((state) => state.product);

  const handlePlaceOrder = () => {
    dispatch(reset());
    navigate("/success", { replace: true });
  };

  return (
    <div className="container px-2 mx-auto">
      <div className="flex items-center ">
        <p className="text-right cursor-pointer" onClick={() => navigate("/")}>
          <BiArrowBack size={28} />
        </p>
        <p className="text-center w-full font-bold md:text-2xl sm:text-xl">
          Checkout
        </p>
      </div>
      <div className="flex flex-col my-8">
        <p className="text-slate-500 font-semibold text-sm border-b border-slate-300 pb-1">
          PICK UP
        </p>
        <p>Test</p>
        <p>Daalchini Office Noida, Uttar Pradesh</p>
        <p>Order expires within 30 mins</p>
      </div>

      <div className="flex flex-col my-8">
        <p className="text-slate-500 font-semibold text-sm border-b border-slate-300 pb-1">
          CART DETAILS
        </p>
        <div className="container flex gap-1 flex-col mx-auto mt-3">
          <div className="flex pb-1">
            <p className="w-1/2 font-semibold">Item</p>
            <p className="w-1/4 text-center  font-semibold">Quantity</p>
            <p className="w-1/4 text-right font-semibold">Amount</p>
          </div>
          {productsInCart.map((item) => {
            const total = item.quantity * item.price;
            return (
              <div
                key={item.id}
                className="flex border-b py-2 items-center border-slate-300"
              >
                <p className="w-1/2 ">{item.title}</p>
                <p className="w-1/4 flex justify-center">
                  <CartButton id={item.id} alreadyInCart={item} />
                </p>
                <p className="w-1/4 text-right">{total.toFixed(2)}</p>
              </div>
            );
          })}
          <div className="flex justify-between">
            <p className="w-1/2 text-xl font-semibold">Total</p>
            <p className=" text-xl font-semibold">{totalAmount}</p>
          </div>
        </div>
      </div>
      <footer
        onClick={handlePlaceOrder}
        className="footer-bottom cursor-pointer hover:bg-green-500 py-4 w-screen text-center bg-green-400 fixed bottom-0 left-0"
      >
        <p className="text-2xl font-bold ">Place Order</p>
      </footer>
    </div>
  );
}

export default Checkout;

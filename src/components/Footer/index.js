import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./style.css";
import Modal from "./Modal";
import { BsBoxArrowInUp, BsBoxArrowDown } from "react-icons/bs";
import CartButton from "../CartButton";
import Login from "../Login";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const { productsInCart, totalProductsInCart, totalAmount, loading } =
    useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);

  const [modalData, setModalData] = useState("cart");

  const [open, setOpen] = useState(false);

  const handleVerification = () => {
    if (!user) {
      setOpen(true);
      setModalData("login");
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    if (user) setModalData("cart");
  }, [user]);

  const handleCartModal = () => {
    setOpen(!open);
    setModalData("cart");
  };

  const onClose = () => setOpen(false);

  if (loading) return;

  return productsInCart.length > 0 ? (
    <>
      <Modal
        modalData={modalData}
        setModalData={setModalData}
        onClose={onClose}
        open={open}
      >
        {modalData === "cart" ? (
          <div className="container flex gap-1 flex-col max-w-4xl mx-auto mt-3">
            <div className="flex pb-1">
              <p className="w-1/2 font-semibold">Item</p>
              <p className="w-1/4 text-center font-semibold">Quantity</p>
              <p className="w-1/4 text-right font-semibold">Amount</p>
            </div>
            {productsInCart.map((item) => {
              const total = item.quantity * item.price;
              return (
                <div
                  key={item.id}
                  className="flex border-b py-2 items-center border-slate-300"
                >
                  <p className="w-1/2 pr-1">{item.title}</p>
                  <p className="w-1/4  flex justify-center">
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
        ) : (
          <Login />
        )}
      </Modal>
      <footer className="footer-bottom  bg-green-400 sticky bottom-0 left-0">
        {/* <div className="bg-yellow-300 absolute top-0 left-0 h-screen "></div> */}
        <div className="container max-w-4xl px-2 flex items-center justify-between mx-auto ">
          <button
            onClick={handleCartModal}
            className="bg-green-800 transition
          duration-150
          ease-in-out cursor-pointer my-2 hover:bg-green-700 rounded-md p-2 flex gap-4 items-center text-white"
          >
            <div className="text-left">
              <p>{totalProductsInCart} item</p>
              <h6>Total: Rs. {totalAmount || 0}</h6>
            </div>
            <p className="text-2xl font-bold">
              {open ? <BsBoxArrowDown /> : <BsBoxArrowInUp />}
            </p>
          </button>
          <button
            onClick={handleVerification}
            className="bg-green-800 hover:bg-green-700 drop-shadow-lg text-white py-2 px-4 rounded-md"
          >
            {user ? "Continue" : "Login"}
          </button>
        </div>
      </footer>
    </>
  ) : null;
}

export default Footer;

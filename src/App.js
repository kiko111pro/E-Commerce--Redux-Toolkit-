import { Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Checkout from "./pages/Checkout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTotal } from "./features/Product/product.reducer";
import PaymentSuccess from "./pages/Success";

function App() {
  const dispatch = useDispatch();
  const { productsInCart } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getTotal());
    localStorage.setItem("CART", JSON.stringify(productsInCart));
  }, [productsInCart, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<PaymentSuccess />} />
      </Routes>
    </>
  );
}

export default App;

import React from "react";
import Product from "./Product";
import Footer from "../../components/Footer/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../features/Product/product.reducer";
import Loading from "./Loading";
import { logout } from "../../features/Auth/auth.reducer";

function ProductList() {
  const dispatch = useDispatch();
  const { getProducts, productsInCart, loading } = useSelector(
    (state) => state.product
  );
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container  mx-auto max-w-screen-xl">
        <h5 className="text-center text-2xl font-bold">Products List</h5>
        {user && (
          <div className="w-full text-right">
            <button
              onClick={() => dispatch(logout())}
              className="bg-red-400 font-semibold hover:bg-red-500 text-right self-end py-2 px-4"
            >
              Logout
            </button>
          </div>
        )}
        {getProducts.map((item) => {
          let alreadyInCart = productsInCart.find(
            (product) => product.id === item.id
          );
          return (
            <Product
              key={item.id}
              description={item.description}
              image={item.image}
              price={item.price}
              title={item.title}
              id={item.id}
              alreadyInCart={alreadyInCart}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
}

export default ProductList;

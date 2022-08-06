export const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const status = response.status;
    const isSuccess = response.ok;
    const result = await response.json();
    return {
      status,
      isSuccess,
      result,
    };
  } catch (error) {
    return {
      isSuccess: false,
      result: error,
    };
  }
};

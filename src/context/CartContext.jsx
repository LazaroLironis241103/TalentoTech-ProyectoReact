/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const isInCart = (item) => {
    const inCart = cart.some((element) => element.id === item.id);
    return inCart;
  };

  const addItem = (item, quantity = 1) => {
    if (isInCart(item)) {
      setCart((prevCart) =>
        prevCart.map((element) => {
          if (element.id === item.id) {
            return { ...element, quantity: element.quantity + quantity };
          }
          return element;
        }),
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity }]);
    }
    alert("Producto agregado al carrito ✓");
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((element) => element.id !== id));
    alert("Producto eliminado ✅");
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, element) => acc + element.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce(
      (acc, element) => acc + element.price * element.quantity,
      0,
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((element) => {
        if (element.id === id) {
          return { ...element, quantity: element.quantity + 1 };
        }
        return element;
      }),
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((element) => {
        if (element.id === id && element.quantity > 1) {
          return { ...element, quantity: element.quantity - 1 };
        }
        return element;
      }),
    );
  };

  const checkout = () => {
    alert("Su compra ha sido realizada 🎉");
    clearCart();
    navigate("/");
  };

  const values = {
    cart,
    addItem,
    clearCart,
    removeItem,
    getCartTotal,
    getTotalItems,
    checkout,
    increaseQuantity,
    decreaseQuantity,
  };

  return <CartContext.Provider value={values}>{children}</CartContext.Provider>;
};

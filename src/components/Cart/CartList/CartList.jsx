import { useCart } from "../../../context/CartContext";
import { CartItem } from "../CartItem/CartItem";
import "./CartList.css";

export const CartList = () => {
  const { cart } = useCart();

  return (
    <div className="cart-list">
      {cart.map((element) => (
        <CartItem {...element} key={element.id} />
      ))}
    </div>
  );
};

import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";
import carritoIcon from "../../assets/shopping-cart-svgrepo-com.svg";
import { useState } from "react";

export const ItemDetail = ({ item }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < 99) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <button
          className="detail-quantity-btn"
          onClick={decreaseQuantity}
          disabled={quantity === 1}
        >
          -
        </button>
        <span className="detail-quantity-count">{quantity}</span>
        <button
          className="detail-quantity-btn"
          onClick={increaseQuantity}
          disabled={quantity === 99}
        >
          +
        </button>
        <button
          className="detail-add-link"
          onClick={() => addItem(item, quantity)}
        >
          <img src={carritoIcon} alt="" className="cart-icon" /> Agregar
        </button>
      </Item>
    </div>
  );
};

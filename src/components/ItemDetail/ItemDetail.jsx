import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";
import "./ItemDetail.css";
import carritoIcon from "../../assets/shopping-cart-svgrepo-com.svg";

export const ItemDetail = ({ item }) => {
  const { addItem } = useCart();
  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <button className="detail-add-link" onClick={() => addItem(item)}>
          <img src={carritoIcon} alt="" className="cart-icon" /> Agregar
        </button>
      </Item>
    </div>
  );
};

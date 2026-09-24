import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemDetail.css";
import carritoIcon from "../../assets/shopping-cart-svgrepo-com.svg";

export const ItemDetail = ({ item }) => {
  return (
    <div className="detail-wrapper">
      <Item {...item}>
        <Link to={"/cart"}>
            <img src={carritoIcon} alt="" className="cart-icon" /> Agregar
        </Link>
      </Item>
    </div>
  );
};

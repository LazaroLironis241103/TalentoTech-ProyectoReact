import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ products, vista }) => {
  if (!products.length) {
    return <p className="empty-products">No hay productos</p>;
  }

  return (
    <div className={`products-container ${vista ? "grid" : "list"}`}>
      {products.map((product) => (
        <Link className="product-link" to={`/product/${product.id}`} key={product.id}>
          <Item {...product}>
            <span className="category-badge">{product.category}</span>
          </Item>
        </Link>
      ))}
    </div>
  );
};

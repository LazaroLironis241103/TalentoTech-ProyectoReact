import { useCart } from "../../../context/CartContext";
import "./CartItem.css";
import { formatPrice } from "../../../utils/formatPrice";

export const CartItem = ({ id, name, price, image, quantity }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <article className="cart-item">
      <img className="cart-item__image" src={image} alt={name} />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
      </div>

      <div className="cart-item__quantity">
        <div className="cart-item__controls">
          <button
            type="button"
            className="cart-item__btn"
            onClick={() => decreaseQuantity(id)}
            disabled={quantity === 1}
            aria-label={`Quitar una unidad de ${name}`}
          >
            -
          </button>
          <span className="cart-item__count">{quantity}</span>
          <button
            type="button"
            className="cart-item__btn"
            onClick={() => increaseQuantity(id)}
            disabled={quantity === 99}
            aria-label={`Agregar una unidad de ${name}`}
          >
            +
          </button>
        </div>
        <p className="cart-item__unit-price">${formatPrice(price)} / ud</p>
      </div>

      <div className="cart-item__actions">
        <p className="cart-item__subtotal">Subtotal: ${formatPrice(price * quantity)}</p>
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeItem(id)}
          aria-label={`Eliminar ${name} del carrito`}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

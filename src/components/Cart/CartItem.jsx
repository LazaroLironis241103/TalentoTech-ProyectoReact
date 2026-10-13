import { useCart } from "../../context/CartContext";

export const CartItem = ({ id, name, price, image, quantity }) => {
  const { removeItem, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <article className="cart-item">
      <img className="cart-item__image" src={image} alt={name} />

      <div className="cart-item__info">
        <h3 className="cart-item__name">{name}</h3>
        {/* TODO: formatear precio */}
        <p className="cart-item__price">${price}</p>
      </div>

      <div className="cart-item__quantity">
        <button
          className="cart-item__btn"
          onClick={() => decreaseQuantity(id)}
          disabled={quantity === 1}
        >
          −
        </button>
        <span className="cart-item__count">{quantity}</span>
        <button className="cart-item__btn" onClick={() => increaseQuantity(id)}>
          +
        </button>
      </div>

      <div className="cart-item__actions">
        {/* TODO: formatear precio */}
        <p className="cart-item__subtotal">Total: ${price * quantity}</p>
        <button className="cart-item__remove" onClick={() => removeItem(id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
};

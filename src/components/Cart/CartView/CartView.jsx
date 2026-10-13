import { useCart } from "../../../context/CartContext";
import { CartList } from "../CartList/CartList";
import { CartSummary } from "../CartSummary/CartSummary";
import { Link } from "react-router-dom";
import "./CartView.css";

export const CartView = () => {
  const { cart } = useCart();

  return (
    <section className="cart-container">
      <p className="cart-tag">
        <span className="dot"></span> Telemetría de Carga // Estado Activo
      </p>
      <h1 className="cart-title">Carrito de compras</h1>

      {cart.length ? (
        <div className="cart-layout">
          <div className="cart-main">
            <CartList />
            <Link className="cart-continue" to={"/"}>
              Continuar explorando
            </Link>
          </div>
          <CartSummary />
        </div>
      ) : (
        <div className="empty-cart">
          <p className="empty-cart__text">El carrito está vacío</p>
          <Link className="empty-cart__link" to={"/"}>
            Volver
          </Link>
        </div>
      )}
    </section>
  );
};

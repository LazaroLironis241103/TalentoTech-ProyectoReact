import { useCart } from "../../../context/CartContext";
import pagoIcon from "../../../assets/pay-in-cash-money-dollar-bill-svgrepo-com.svg";
import garantiaIcon from "../../../assets/shield-check-svgrepo-com.svg";
import "./CartSummary.css";
import { formatPrice } from "../../../utils/formatPrice";

export const CartSummary = () => {
  const { getCartTotal, getTotalItems, checkout } = useCart();
  const total = getCartTotal();
  const totalItems = getTotalItems();

  return (
    <div className="cart-summary">
      <h3>Resumen del pedido</h3>
      <p>Total de unidades {totalItems}</p>
      <p>Total a pagar: ${formatPrice(total)}</p>
      <button className="cart-summary__btn" onClick={checkout}>
        Finalizar compra
      </button>

      <div className="trust-cart">
        <div className="cart-card">
          <img src={pagoIcon} alt="" className="feature-icon" />
          <h3>Pago Cifrado</h3>
          <p>Transacción blindada de extremo a extremo.</p>
        </div>

        <div className="cart-card">
          <img src={garantiaIcon} alt="" className="feature-icon" />
          <h3>Garantía Nexus Pro 2 Años</h3>
          <p>Sustitución inmediata por defecto técnico.</p>
        </div>
      </div>
    </div>
  );
};

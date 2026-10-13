// Formatear Precio para antes de la entrega
import { useCart } from "../../context/CartContext";

export const CartSummary = () => {
  const { getCartTotal, checkout } = useCart();
  const total = getCartTotal();

  return (
    <div className="cart-summary">
      <p>Total a pagar: ${total}</p>
      <button onClick={checkout}>
        Finalizar compra
      </button>
    </div>
  );
};

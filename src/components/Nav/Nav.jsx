import { Link } from "react-router-dom";
import "./Nav.css";
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import carritoIcon from "../../assets/shopping-cart-svgrepo-com.svg";

export const Nav = () => {
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const toggleCategorias = (event) => {
  event.stopPropagation();
  setMostrarCategorias(!mostrarCategorias);
};

useEffect(() => {
    const cerrarMenuCategorias = () => {
        setMostrarCategorias(false)
    };

    document.addEventListener("click", cerrarMenuCategorias);

    return () => {
        document.removeEventListener("click", cerrarMenuCategorias);
    }
}, [])

  return (
    <nav className="site-nav">
      <ul className="nav-list">
        <li>
          <Link className="nav-link" to={"/"}>Inicio</Link>
        </li>
        <li>
          <button
            type="button"
            className="category-toggle"
            onClick={toggleCategorias}
          >
            Categorías
          </button>
          {mostrarCategorias && (
            <ul className="category-menu">
              <li>
                <Link className="nav-link" to={"/category/teclados"}>Teclados</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/category/mouses"}>Mouses</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/category/auriculares"}>Auriculares</Link>
              </li>
              <li>
                <Link className="nav-link" to={"/category/sillas"}>Sillas</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
            <Link className="nav-link" to={"/category/ofertas"}>Ofertas</Link>
        </li>
        <li>
          <Link className="nav-link" to={"/cart"}>
          <div className="cart-icon-wrapper">
            <img src={carritoIcon} alt="" className="cart-icon" />
            {totalItems > 0 && <span className="incart">{totalItems}</span>}
          </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

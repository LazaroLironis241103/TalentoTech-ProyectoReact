import { Link } from "react-router-dom";
import "./Nav.css";
import { useState } from "react";

export const Nav = () => {
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

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
            onClick={() => setMostrarCategorias(!mostrarCategorias)}
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
          <Link className="nav-link" to={"/cart"}>Carrito</Link>
        </li>
      </ul>
    </nav>
  );
};

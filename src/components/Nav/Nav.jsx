import { Link } from "react-router-dom";
import "./Nav.css";
import { useState } from "react";

export const Nav = () => {
  const [mostrarCategorias, setMostrarCategorias] = useState(false);

  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setMostrarCategorias(!mostrarCategorias)}
          >
            Categorías
          </button>
          {mostrarCategorias && (
            <ul>
              <li>
                <Link to={"/category/teclados"}>Teclados</Link>
              </li>
              <li>
                <Link to={"/category/mouses"}>Mouses</Link>
              </li>
              <li>
                <Link to={"/category/auriculares"}>Auriculares</Link>
              </li>
              <li>
                <Link to={"/category/sillas"}>Sillas</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to={"/cart"}>Carrito</Link>
        </li>
      </ul>
    </nav>
  );
};

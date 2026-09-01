import "./Nav.css";

export const Nav = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <a href={"/"}>Home</a>
        </li>
        <li>
          <a href={"/#"}>Carrito</a>
        </li>
      </ul>
    </nav>
  );
};

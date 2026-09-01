import { Nav } from "../Nav/Nav";
import logo from "../../assets/react.svg";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <a href={"/"}>
          <img src={logo} alt="logo reactiva" />
          <span>Reactiva</span>
        </a>
      </div>
      <Nav />
    </header>
  );
};

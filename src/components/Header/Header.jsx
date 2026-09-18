import { Nav } from "../Nav/Nav";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <Link to={"/"}>
          <img src={logo} alt="logo Nexus Gear" />
          <span>Nexus Gear</span>
        </Link>
      </div>
      <Nav />
    </header>
  );
};

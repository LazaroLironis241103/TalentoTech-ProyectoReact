import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { Link, useParams } from "react-router-dom";
import camionIcon from "../../assets/truck-svgrepo-com.svg";
import garantiaIcon from "../../assets/shield-check-svgrepo-com.svg";
import devolucionIcon from "../../assets/refresh-square-svgrepo-com.svg";
import soporteIcon from "../../assets/shopping-support-svgrepo-com.svg";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const productosFiltrados = products.filter((producto) => {
    return (
      producto.category == category ||
      !category ||
      (category == "ofertas" && producto.precioAnterior)
    );
  });
  const [tipoDeVista, setTipoDeVista] = useState(true);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al cargar los productos");
        }

        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setErrors(error.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (errors) return <p>{errors}</p>;

  return (
    <section>
      <p className="hero-tag">
        <span className="dot"></span> Nueva Generación 2026 // RGB Sync
      </p>
      <h1>Arsenal de Alto Rendimiento</h1>
      <p className="hero-description">
        Periféricos profesionales con telemetría de ultra baja latencia,
        calibrados para esports competitivos y creadores de contenido de élite.
      </p>
      <nav>
        <Link to="/" className={!category ? "pill-activo" : "pill"}>
          Ver todos
        </Link>
        <Link
          to={"/category/teclados"}
          className={category == "teclados" ? "pill-activo" : "pill"}
        >
          Teclados Mecánicos
        </Link>
        <Link
          to={"/category/mouses"}
          className={category == "mouses" ? "pill-activo" : "pill"}
        >
          Mouses Ópticos
        </Link>
        <Link
          to={"/category/auriculares"}
          className={category == "auriculares" ? "pill-activo" : "pill"}
        >
          Auriculares Gamer
        </Link>
        <Link
          to={"/category/sillas"}
          className={category == "sillas" ? "pill-activo" : "pill"}
        >
          Sillas Ergonómicas
        </Link>
      </nav>
      <div>
        <button
          type="button"
          onClick={() => setTipoDeVista(true)}
          className={tipoDeVista ? "grid-activo" : "grid-desactivado"}
        >
          ⊞
        </button>
        <button
          type="button"
          onClick={() => setTipoDeVista(false)}
          className={!tipoDeVista ? "list-activo" : "list-desactivado"}
        >
          ☰
        </button>
      </div>
      <p>
        Mostrando {productosFiltrados.length} de {products.length} productos
      </p>
      <ItemList products={productosFiltrados} vista={tipoDeVista} />

      <div className="trust-banner">
        <p>PROTOCOLOS DE TELEMETRÍA ULTRA-SYNC</p>
        <h2>¿Listo para competir sin latencia de hardware?</h2>
        <p>
          Cada periférico de Nexus Gear pasa pruebas rigurosas en nuestros
          bancos de calibración óptica antes del despacho. Soporte de perfiles
          onboard y zero drivers bloatware.
        </p>
      </div>

      <div className="trust-features">
        <div>
          <img src={camionIcon} alt="Envío Express" className="feature-icon" />
          <h3>Envío Express</h3>
          <p>Entrega pro-tier en 24/48hs a todo el país.</p>
        </div>
        <div>
          <img
            src={garantiaIcon}
            alt="2 Años de Garantía"
            className="feature-icon"
          />
          <h3>2 Años de Garantía</h3>
          <p>Reemplazo directo sin demoras burocráticas.</p>
        </div>
        <div>
          <img
            src={devolucionIcon}
            alt="Devolución 30 Días"
            className="feature-icon"
          />
          <h3>Devolución 30 Días</h3>
          <p>Prueba tu gear sin costo y sin riesgos.</p>
        </div>
        <div>
          <img
            src={soporteIcon}
            alt="Soporte Pro 24/7"
            className="feature-icon"
          />
          <h3>Soporte Pro 24/7</h3>
          <p>Ingenieros disponibles en directo.</p>
        </div>
      </div>
    </section>
  );
};

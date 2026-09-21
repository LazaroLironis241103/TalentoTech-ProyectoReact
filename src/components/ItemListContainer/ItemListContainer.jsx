import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { Link, useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  const productosFiltrados = products.filter((producto) => {
    return producto.category == category || !category || (category == "ofertas" && producto.precioAnterior);
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
      <h1>Arsenal de Alto Rendimiento</h1>
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
      <p>Mostrando {productosFiltrados.length} de {products.length} productos</p>
      <ItemList products={productosFiltrados} vista={tipoDeVista} />
    </section>
  );
};

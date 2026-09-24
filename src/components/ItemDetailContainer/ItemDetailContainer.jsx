import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { ItemList } from "../ItemList/ItemList";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productosRelacionados, setProductosRelacionados] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItemDetail(null);
    setLoading(true);
    setError(null);
    setProductosRelacionados([]);

    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const item = data.find((product) => String(product.id) === id);
        if (item) {
          setItemDetail(item);
          const relacionados = data.filter(
            (r) => r.category === item.category && r.id !== item.id,
          );
          setProductosRelacionados(relacionados);
          return;
        }
        throw new Error("Elemento no encontrado");
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="detail-status">Cargando...</p>;
  if (error) return <p className="detail-status detail-error">{error}</p>;
  if (!itemDetail) return <p className="detail-status">Producto no encontrado</p>;

  return (
    <section className="detail-content">
      <h1 className="detail-title">Detalles del producto</h1>
      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
      <div className="related-products">
          <h2>Productos relacionados</h2>
          <div>
            <ItemList products={productosRelacionados}/>
          </div>
        </div>
    </section>
  );
};

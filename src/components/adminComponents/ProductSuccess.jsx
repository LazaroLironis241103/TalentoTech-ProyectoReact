import { Link, useParams } from "react-router-dom"

export const ProductSuccess = () => {
    const { id } = useParams();

    return (
        <section className="success-page">
      <div className="success-icon">✅</div>

      <h2>Producto cargado con exito</h2>
      <p>ID de producto: {id}</p>
      <p>Puede cargar otro haciendo click en el boton.</p>

      <div className="success-actions">
        {/* <Link className="btn bg-primary primary" to="/admin/dashboard">
          Volver al panel
        </Link> */}

        {/* <Link className="btn bg-success primary" to="/admin/products/new">
          Cargar otro producto
        </Link> */}

        <Link className="btn bg-success primary" to="/admin">
        Cargar otro producto
        </Link>
      </div>
      </section>
    )
}

import { Link, useParams } from "react-router-dom"

export const ProductSuccess = () => {
    const { id } = useParams();

    return (
        <section className="success-page">
            <div className="success-icon">✅</div>

            <h2 className="success-title">Producto cargado con éxito</h2>
            <p className="success-id">ID de producto: {id}</p>
            <p className="success-copy">Puede cargar otro haciendo click en el boton.</p>

            <div className="success-actions">
                <Link className="success-action" to="/admin/dashboard">
                    Volver al panel
                </Link>

                <Link className="success-action success-action--secondary" to="/admin/products/new">
                    Cargar otro producto
                </Link>
            </div>
        </section>
    )
}

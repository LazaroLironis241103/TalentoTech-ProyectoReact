import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../services/productsService.js";

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [deleteError, setDeleteError] = useState(null);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar este producto?")) return;
        try {
            await deleteProduct(id);
            setDeleteError(null);
            setProducts((prev) => prev.filter((product) => product.id !== id));
        } catch (err) {
            console.error("Error al eliminar producto:", err);
            setDeleteError("No se pudo eliminar el producto.");
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const productsData = await getProducts();
                setProducts(productsData);
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("Error al cargar productos.");
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard">
            <h1>Panel de administración</h1>
            <section className="dashboard-actions">
                <h3>Acciones rápidas</h3>
                <div className="actions-grid">
                    <Link to="/admin/products/new" className="action-card">
                        Cargar producto
                    </Link>
                </div>
            </section>

            <section className="dashboard-products">
                <h3>Productos cargados</h3>
                {deleteError && <p>{deleteError}</p>}
                {products.length === 0 ? (
                    <p>No hay productos cargados</p>) : (
                    products.map((product) => (
                        <div key={product.id} className="product-card">
                            <h4>{product.name}</h4>
                            <p>Precio: ${product.price}</p>
                            <div className="product-actions">
                                <Link to={`/admin/products/edit/${product.id}`}>
                                    Editar
                                </Link>
                                <button type="button" onClick={() => handleDelete(product.id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    ))
                )}

            </section>
        </div>
    );
}

import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../services/productsService.js";

export const Dashboard = () => {
    const { logout } = useAuth();
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
            <header className="dashboard-header">
                <h2>Panel de administración</h2>

                <div className="header-actions">
                    <Link to="/">
                        Volver a la tienda
                    </Link>
                    <button onClick={logout}>
                        Cerrar sesión
                    </button>
                </div>
            </header>

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

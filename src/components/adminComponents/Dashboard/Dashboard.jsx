import { Link } from "react-router-dom";
import "./Dashboard.css";
import { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../../services/productsService.js";
import { formatPrice } from "../../../utils/formatPrice.js";
import { Spinner } from "../../Spinner/Spinner.jsx";
import { getOrders } from "../../../services/ordersService.js";
import { Table } from "react-bootstrap";

export const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [deleteError, setDeleteError] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todas");

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [ordersError, setOrdersError] = useState(null);

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

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const ordersData = await getOrders();
                setOrders(ordersData);
            } catch (err) {
                console.error("Error al cargar la lista de ordenes:", err);
                setOrdersError("Error al cargar la lista de ordenes.");
            } finally {
                setLoadingOrders(false);
            }
        };
        loadOrders();
    }, []);


    if (error) {
        return (
            <div className="dashboard dashboard-state">
                <p className="dashboard-state__message dashboard-state__message--error" role="alert">{error}</p>
            </div>
        );
    }

    const totalProducts = products.length;
    const offerProducts = products.filter((product) => product.precioAnterior).length;
    const totalPrice = products.reduce((acumulador, product) => {
        return acumulador + product.price;
    }, 0);

    const averagePrice = products.length > 0 ? Math.round(totalPrice / products.length) : 0;

    const categories = new Set(products.map((product) => product.category));
    const uniqueCategories = Array.from(categories);
    const totalCategories = uniqueCategories.length;

    const filteredProducts = products.filter((product) => {
        return (
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "Todas" || product.category === selectedCategory)
        );
    });

    return (
        <div className="dashboard">
            <header className="dashboard-top">
                <div>
                    <h1 className="dashboard-title">Panel de administración</h1>
                    <p className="dashboard-subtitle">
                        Gestioná los productos de la tienda
                    </p>
                </div>

                <Link to="/admin/products/new" className="dashboard-new-btn">
                    Cargar nuevo producto
                </Link>
            </header>

            <section className="dashboard-stats">
                <div className="dashboard-stat">
                    <p className="dashboard-stat__label">Total de productos</p>
                    <p className="dashboard-stat__value">{totalProducts}</p>
                </div>

                <div className="dashboard-stat">
                    <p className="dashboard-stat__label">Productos en oferta</p>
                    <p className="dashboard-stat__value">{offerProducts}</p>
                </div>

                <div className="dashboard-stat">
                    <p className="dashboard-stat__label">Categorías</p>
                    <p className="dashboard-stat__value">{totalCategories}</p>
                </div>

                <div className="dashboard-stat">
                    <p className="dashboard-stat__label">Precio promedio</p>
                    <p className="dashboard-stat__value">
                        ${formatPrice(averagePrice)}
                    </p>
                </div>
            </section>

            <section className="dashboard-products">
                <div className="dashboard-products__heading">
                    <h2>Productos cargados</h2>
                    <span className="dashboard-products__count">{filteredProducts.length} productos</span>
                </div>

                <div className="dashboard-filters">
                    <input
                        className="dashboard-filter-control dashboard-search"
                        type="text"
                        placeholder="Buscar producto por nombre..."
                        aria-label="Buscar producto por nombre"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        className="dashboard-filter-control dashboard-category"
                        id="category"
                        name="category"
                        aria-label="Filtrar por categoría"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="Todas">Todas las categorías</option>
                        {uniqueCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {deleteError && <p className="dashboard-delete-error" role="alert">{deleteError}</p>}

                {loading && (
                    <div className="dashboard-state">
                        <Spinner loading={loading} />
                        <p className="dashboard-state__message">Cargando productos...</p>
                    </div>
                )}

                {!loading && products.length === 0 && (
                    <p className="dashboard-empty-state">No hay productos cargados</p>
                )}

                {!loading && products.length > 0 && filteredProducts.length === 0 && (
                    <p className="dashboard-empty-state">No se encontraron productos</p>
                )}

                {!loading && filteredProducts.length > 0 && (
                    <div className="dashboard-product-list">
                        {filteredProducts.map((product) => (
                            <article key={product.id} className="dashboard-product-card">
                                {product.image && (
                                    <img
                                        className="dashboard-product-card__image"
                                        src={product.image}
                                        alt={product.name}
                                    />
                                )}
                                <div className="dashboard-product-card__details">
                                    <h3>{product.name}</h3>
                                    <p className="dashboard-product-card__price">${formatPrice(product.price)}</p>
                                </div>

                                <div className="dashboard-product-actions">
                                    <Link to={`/admin/products/edit/${product.id}`}>
                                        Editar
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={() => handleDelete(product.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            <section className="dashboard-orders">
                <div className="dashboard-orders__heading">
                    <h2>Órdenes de compra</h2>
                    {!loadingOrders && <span>{orders.length} órdenes</span>}
                </div>

                {loadingOrders && <Spinner loading={loadingOrders} />}

                {ordersError && <p role="alert">{ordersError}</p>}

                {!loadingOrders && !ordersError && orders.length === 0 && (
                    <p>No hay órdenes registradas.</p>
                )}

                {!loadingOrders && !ordersError && orders.length > 0 && (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Orden</th>
                                <th>Fecha</th>
                                <th>Productos</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.date.toDate().toLocaleDateString("es-AR")}</td>
                                    <td>
                                        {order.items.map((item) => (
                                            <p key={item.id}>
                                                {item.name} x {item.quantity}
                                            </p>
                                        ))}
                                    </td>
                                    <td>${formatPrice(order.total)}</td>
                                    <td>{order.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </section>
        </div>
    );
}

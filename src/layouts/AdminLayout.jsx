import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./AdminLayout.css";

export const AdminLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__brand">
                    <span className="admin-sidebar__mark" aria-hidden="true">NG</span>
                    <div className="admin-sidebar__brand-copy">
                        <p className="admin-sidebar__title">Nexus Gear</p>
                        <p className="admin-sidebar__subtitle">Panel admin</p>
                    </div>
                </div>

                <nav className="admin-sidebar__nav" aria-label="Navegación de administración">
                    <NavLink to="/admin/dashboard" className="admin-sidebar__link">Dashboard</NavLink>
                    <NavLink to="/admin/products/new" className="admin-sidebar__link">Nuevo Producto</NavLink>
                    <Link className="admin-sidebar__link" to="/">Volver a la tienda</Link>
                </nav>

                <div className="admin-sidebar__footer">
                    <p className="admin-sidebar__user">{user?.email}</p>
                    <button type="button" onClick={logout} className="admin-sidebar__logout">Cerrar sesión</button>
                </div>
            </aside>
            <main className="admin-main">
                <Outlet />
            </main>
        </div>
    );
};

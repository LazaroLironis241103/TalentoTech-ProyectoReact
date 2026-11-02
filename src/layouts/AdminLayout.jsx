import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminLayout = () => {
    const { user, logout } = useAuth();

    return (
        <div className="admin-shell">
            <aside className="admin-sidebar">
                <div className="admin-sidebar__brand">
                    <p className="admin-sidebar__title">Nexus Gear</p>
                    <p className="admin-sidebar__subtitle">Panel admin</p>
                </div>

                <nav>
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

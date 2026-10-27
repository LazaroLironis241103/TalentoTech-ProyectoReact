import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../ItemDetail/ItemDetail.css";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <p className="detail-status">Cargando...</p>;

    if (!user) return <Navigate to="/admin/login" replace />;

    return children;
};

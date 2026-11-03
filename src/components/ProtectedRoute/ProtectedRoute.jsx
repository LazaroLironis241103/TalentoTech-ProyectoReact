import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../ItemDetail/ItemDetail.css";
import { Spinner } from "../Spinner/Spinner";

export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
    return (
        <div className="detail-status">
             <Spinner loading={loading} />
        </div>
    );
}

    if (!user) return <Navigate to="/admin/login" replace />;

    return children;
};

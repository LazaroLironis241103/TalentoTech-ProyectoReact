import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { CartView } from "./components/Cart/CartView/CartView";
import { ProductFormContainer } from "./components/adminComponents/ProductForm/ProductFormContainer";
import { ProductSuccess } from "./components/adminComponents/ProductSuccess";
import { PublicLayout } from "./layouts/PublicLayout";
import { AdminLayout } from "./layouts/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { Login } from "./components/Login/Login";
import { Dashboard } from "./components/adminComponents/Dashboard/Dashboard";

function App() {
    return (
        <Routes>
            {/* Rutas Publicas */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<ItemListContainer />} />
                <Route path="/cart" element={<CartView />} />
                <Route path="/product/:id" element={<ItemDetailContainer />} />
                <Route path="/category/:category" element={<ItemListContainer />} />
                <Route path="*" element={<h1 className="page-message">Página no encontrada</h1>} />
            </Route>

            {/* Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Admin */}
            <Route path="/admin" element={
                <ProtectedRoute>
                    <AdminLayout />
                </ProtectedRoute>}
            >
                {/* Rutas Admin */}
                <Route index element={<Navigate to={"dashboard"} />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="products/new" element={<ProductFormContainer />} />
                <Route path="products/success/:id" element={<ProductSuccess />} />
            </Route>
        </Routes>
    );
}

export default App;

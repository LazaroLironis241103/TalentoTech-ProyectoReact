import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/cart" element={<h1 className="page-message">El carrito de compras estará disponible próximamente.</h1>} />
          <Route path="/product/:id" element={<ItemDetailContainer />} />
          {/* opcional: filtro por categorias */}
          <Route path="/category/:category" element={<ItemListContainer />} />
          <Route path="*" element={<h1 className="page-message">Página no encontrada</h1>}/>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;

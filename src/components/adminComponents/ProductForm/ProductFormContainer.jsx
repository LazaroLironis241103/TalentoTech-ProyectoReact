import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../../utils/validateProduct";
import { uploadImage } from "../../../services/uploadImage.js";
import { createProduct, getProductById, updateProduct } from "../../../services/productsService.js";
import { Spinner } from "../../Spinner/Spinner.jsx";

export const ProductFormContainer = () => {
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [loadingProduct, setLoadingProduct] = useState(isEditing);
    const [loadError, setLoadError] = useState(null);
    const [currentImage, setCurrentImage] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        price: "",
        precioAnterior: "",
        category: "",
        description: "",
        badge: "",
    });

    useEffect(() => {
        if (!isEditing) return;

        getProductById(id)
            .then((data) => {
                if (!data) {
                    setLoadError("Producto no encontrado.");
                    return;
                }
                setProduct({
                    name: data.name,
                    price: data.price,
                    precioAnterior: data.precioAnterior ?? "",
                    category: data.category,
                    description: data.description,
                    badge: data.badge ?? "",
                });
                setCurrentImage(data.image);
            })
            .catch((error) => {
                console.error("Error al obtener producto:", error);
                setLoadError("Error al obtener producto.");
            })
            .finally(() => setLoadingProduct(false));
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0] || null;
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        const newErrors = validateProduct({ ...product, file }, isEditing);
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const imageUrl = file ? await uploadImage(file) : currentImage;

            const productData = {
                ...product,
                price: Number(product.price),
                precioAnterior: product.precioAnterior
                    ? Number(product.precioAnterior)
                    : null,
                image: imageUrl,
            };

            if (isEditing) {
                await updateProduct(id, productData);
                navigate("/admin/dashboard", { replace: true });
            } else {
                const newId = await createProduct(productData);
                setProduct({ name: "", price: "", precioAnterior: "", description: "", category: "", badge: "" });
                setFile(null);
                navigate(`/admin/products/success/${newId}`, { replace: true });
            }

        } catch (error) {
            setErrors({ general: error.message });
        } finally {
            setLoading(false);
        }
    };

    if (loadingProduct) {
        return (
            <div className="detail-status">
                <Spinner loading={loadingProduct} />
                <p>Cargando producto...</p>
            </div>
        );
    }
    if (loadError) return <p className="detail-status detail-error">{loadError}</p>;

    return (
        <ProductFormUI
            product={product}
            errors={errors}
            loading={loading}
            onChange={handleChange}
            onFileChange={handleFileChange}
            onSubmit={handleSubmit}
            isEditing={isEditing}
            currentImage={currentImage}
        />
    )
}

import "./ProductFormContainer.css";

export const ProductFormUI = ({
    product,
    errors,
    loading,
    onChange,
    onFileChange,
    onSubmit,
    isEditing,
    currentImage,
}) => {
    return (
        <section>
            <form className="product-form" onSubmit={onSubmit}>
                <h2>
                    {isEditing ? "Editar producto" : "Agregar nuevo producto"}
                </h2>

                <div>
                    <label htmlFor="name">Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={onChange}
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="price">Precio:</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={onChange}
                        min="0"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>
                <div>
                    <label htmlFor="precioAnterior">Precio Anterior:</label>
                    <input
                        type="number"
                        name="precioAnterior"
                        id="precioAnterior"
                        value={product.precioAnterior}
                        onChange={onChange}
                        min="0"
                    />
                    {errors.precioAnterior && <p className="error">{errors.precioAnterior}</p>}
                </div>

                <div>
                    <label htmlFor="category">Categoría:</label>
                    <select id="category" name="category" value={product.category} onChange={onChange}>
                        <option value="">Seleccioná una categoría</option>
                        <option value="teclados">Teclados</option>
                        <option value="mouses">Mouses</option>
                        <option value="auriculares">Auriculares</option>
                        <option value="sillas">Sillas</option>
                    </select>
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div>
                    <label htmlFor="badge">Badge:</label>
                    <input
                        type="text"
                        name="badge"
                        id="badge"
                        value={product.badge}
                        onChange={onChange}
                    />
                    {errors.badge && <p className="error">{errors.badge}</p>}
                </div>
                <div>
                    <label htmlFor="description">Descripción:</label>
                    <textarea
                        name="description"
                        id="description"
                        value={product.description}
                        onChange={onChange}
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div>
                    <label htmlFor="image">Imagen:</label>
                    {isEditing && currentImage && (
                        <img src={currentImage} alt="Imagen actual del producto" className="product-preview" />
                    )}
                    <input type="file" accept="image/jpeg,image/png,image/webp" id="image" onChange={onFileChange} />
                    {isEditing && <p>Dejá vacío para conservar la imagen actual.</p>}
                    {errors.file && <p className="error">{errors.file}</p>}
                </div>

                <button className="btn bg-primary" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar"}
                </button>

                {errors.general && <p className="error">{errors.general}</p>}
            </form>
        </section>
    )
}

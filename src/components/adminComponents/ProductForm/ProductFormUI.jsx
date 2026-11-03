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
        <section className="product-form__layout">
            <form className="product-form__card" onSubmit={onSubmit}>
                <h2 className="product-form__title">
                    {isEditing ? "Editar producto" : "Agregar nuevo producto"}
                </h2>

                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="name">Nombre:</label>
                    <input
                        className="product-form__control"
                        type="text"
                        name="name"
                        id="name"
                        value={product.name}
                        onChange={onChange}
                    />
                    {errors.name && <p className="product-form__error">{errors.name}</p>}
                </div>
                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="price">Precio:</label>
                    <input
                        className="product-form__control"
                        type="number"
                        name="price"
                        id="price"
                        value={product.price}
                        onChange={onChange}
                        min="0"
                    />
                    {errors.price && <p className="product-form__error">{errors.price}</p>}
                </div>
                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="precioAnterior">Precio Anterior:</label>
                    <input
                        className="product-form__control"
                        type="number"
                        name="precioAnterior"
                        id="precioAnterior"
                        value={product.precioAnterior}
                        onChange={onChange}
                        min="0"
                    />
                    {errors.precioAnterior && <p className="product-form__error">{errors.precioAnterior}</p>}
                </div>

                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="category">Categoría:</label>
                    <select className="product-form__control" id="category" name="category" value={product.category} onChange={onChange}>
                        <option value="">Seleccioná una categoría</option>
                        <option value="teclados">Teclados</option>
                        <option value="mouses">Mouses</option>
                        <option value="auriculares">Auriculares</option>
                        <option value="sillas">Sillas</option>
                    </select>
                    {errors.category && <p className="product-form__error">{errors.category}</p>}
                </div>

                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="badge">Badge:</label>
                    <input
                        className="product-form__control"
                        type="text"
                        name="badge"
                        id="badge"
                        value={product.badge}
                        onChange={onChange}
                    />
                    {errors.badge && <p className="product-form__error">{errors.badge}</p>}
                </div>
                <div className="product-form__field">
                    <label className="product-form__label" htmlFor="description">Descripción:</label>
                    <textarea
                        className="product-form__control product-form__textarea"
                        name="description"
                        id="description"
                        value={product.description}
                        onChange={onChange}
                    />
                    {errors.description && <p className="product-form__error">{errors.description}</p>}
                </div>

                <div className="product-form__field product-form__image-field">
                    <label className="product-form__label" htmlFor="image">Imagen:</label>
                    {isEditing && currentImage && (
                        <img src={currentImage} alt="Imagen actual del producto" className="product-form__preview" />
                    )}
                    <input className="product-form__control product-form__file" type="file" accept="image/jpeg,image/png,image/webp" id="image" onChange={onFileChange} />
                    {isEditing && <p className="product-form__hint">Dejá vacío para conservar la imagen actual.</p>}
                    {errors.file && <p className="product-form__error">{errors.file}</p>}
                </div>

                <button className="product-form__submit" type="submit" disabled={loading}>
                    {loading ? "Guardando..." : isEditing ? "Guardar cambios" : "Guardar"}
                </button>

                {errors.general && <p className="product-form__error product-form__error--general">{errors.general}</p>}
            </form>
        </section>
    );
}

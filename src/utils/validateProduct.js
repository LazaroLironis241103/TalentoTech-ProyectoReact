export const validateProduct = (product) => {
    const errors = {};

    if (!product.name.trim()) {
        errors.name = "El nombre es obligatorio."
    }

    if (!product.price || product.price <= 0) {
        errors.price = "El precio debe ser mayor a 0."
    }

    if (product.precioAnterior) {
        const prevPrice = Number(product.precioAnterior);

        if (!Number.isInteger(prevPrice) || prevPrice <= Number(product.price)) {
            errors.precioAnterior = "Debe ser un número entero y mayor al precio actual."
        }
    }

    if (!product.description.trim()) {
        errors.description = "La descripción es obligatoria."
    }

    if (!product.category.trim()) {
        errors.category = "La categoria es obligatoria."
    }

    if (product.badge && product.badge.trim().length > 20) {
        errors.badge = "La etiqueta no puede superar los 20 caracteres."
    }

    if (!product.file) {
        errors.file = "Debes seleccionar una imagen."
    }

    return errors;
}

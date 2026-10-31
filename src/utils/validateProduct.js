const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024;

export const validateProduct = (product, isEditing = false) => {
    const errors = {};
    const price = Number(product.price);

    if (!product.name.trim()) {
        errors.name = "El nombre es obligatorio."
    }

    if (!Number.isInteger(price) || price <= 0) {
        errors.price = "El precio debe ser un número entero mayor a 0."
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
        if (!isEditing) {
            errors.file = "Debes seleccionar una imagen."
        }
    } else if (!ALLOWED_TYPES.includes(product.file.type)) {
        errors.file = "El archivo debe ser una imagen (jpg, png, webp)."
    } else if (product.file.size > MAX_SIZE) {
        errors.file = "El archivo no puede superar los 2MB."
    }
    return errors;
}

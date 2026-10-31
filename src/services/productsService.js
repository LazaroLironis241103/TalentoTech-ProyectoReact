import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Referencia a la colección "products" (la misma de la consola de Firebase)
const productsRef = collection(db, "products");

// Trae todos los productos
export const getProducts = async () => {
    try {
        const snapshot = await getDocs(productsRef);

        return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (error) {
        console.error("Error al traer productos:", error);
        throw error;
    }
};

// Trae un solo producto por su id. Devuelve null si no existe
export const getProductById = async (id) => {
    try {
        const productRef = doc(productsRef, id);
        const snapshot = await getDoc(productRef);

        if (snapshot.exists()) {
            return { id: snapshot.id, ...snapshot.data() };
        }
        return null;
    } catch (error) {
        console.error("Error al traer el producto por ID:", error);
        throw error;
    }
};

// Filtra por categoría. Si no llega categoría, trae todos
export const getByCategory = async (category) => {
    try {
        const queryRef = category
            ? query(productsRef, where("category", "==", category))
            : productsRef;

        const snapshot = await getDocs(queryRef);

        return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (error) {
        console.error("Error al filtrar productos:", error);
        throw error;
    }
};

// Alta de Producto

export const createProduct = async (productData) => {
    try {
        const docRef = await addDoc(productsRef, productData);

        return docRef.id;
    } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
    }
};

// Update de Producto

export const updateProduct = async (id, updatedData) => {
    try {
        // Referencia al documento
        const productRef = doc(productsRef, id);

        // Actualizamos SOLO los campos que mandes en updatedData
        await updateDoc(productRef, updatedData);
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
    }
};


// Delete de Producto

export const deleteProduct = async (id) => {
    try {
        const productRef = doc(productsRef, id);

        await deleteDoc(productRef);
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
    }
};

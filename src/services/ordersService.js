import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const orderRef = collection(db, "orders");

export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(orderRef, orderData);
        return docRef.id;
    } catch (error) {
        console.error("Error de orden:", error);
        throw error;
    }
};

export const getOrders = async () => {
    try {
        const orderSnapshot = await getDocs(orderRef);

        return orderSnapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
    } catch (error) {
        console.error("Error al traer la lista de ordenes:", error);
        throw error;
    }
}

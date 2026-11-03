import { Spinner as BootstrapSpinner } from "react-bootstrap";

export const Spinner = ({ loading }) => {
    if (!loading) return null;

    return (
        <BootstrapSpinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Cargando...</span>
        </BootstrapSpinner>

    );
};

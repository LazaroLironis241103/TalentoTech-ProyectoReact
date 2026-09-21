import "./Item.css";

export const Item = ({ name, price, description, image, children, badge, precioAnterior }) => {
  return (
    <article className="card">
      <div className="image-wrapper">
        <img src={image} alt={name} />
        {children}
        {badge && (
            <span className="product-badge">{badge}</span>
        )}
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
      {precioAnterior && (
            <p><s>${precioAnterior}</s></p>
        )}
    </article>
  );
};

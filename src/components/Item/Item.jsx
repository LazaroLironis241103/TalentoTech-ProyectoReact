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
      <h3 className="item-card__name">{name}</h3>
      <p className="item-card__description">{description}</p>
      <p className="item-card__price">${price}</p>
      {precioAnterior && (
        <p className="item-card__previous-price"><s>${precioAnterior}</s></p>
        )}
    </article>
  );
};

import "./Item.css";

export const Item = ({ name, price, description, image, children }) => {
  return (
    <article className="card">
      <div className="image-wrapper">
        <img src={image} alt={name} />
        {children}
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>${price}</p>
    </article>
  );
};

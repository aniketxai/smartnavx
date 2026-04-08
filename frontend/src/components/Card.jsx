import { Link } from 'react-router-dom';

function Card({ title, description, icon, linkTo }) {
  return (
    <Link to={linkTo} className="card">
      <div className="card-icon">{icon}</div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </Link>
  );
}

export default Card;

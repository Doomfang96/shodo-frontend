import PropTypes from "prop-types";
import "./Card.scss";

export function CardContainer(props) {
  
  return <div className="cardContainer">{props.children}</div>;
}

export function Card(props) {

  return <div className="card">{props.children}</div>;
}

CardContainer.propTypes = {
  children: PropTypes.node,
};

Card.propTypes = {
  children: PropTypes.node,
};

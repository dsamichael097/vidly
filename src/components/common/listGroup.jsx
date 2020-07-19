import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    selectedItem,
    onItemSelect,
  } = props;
  return (
    <ul className="list-group">
      {/*<li className="list-group-item active">All Genres</li>*/}
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            "cursor-style " +
            (selectedItem === item
              ? "list-group-item active"
              : "list-group-item")
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;

/* 

ListGroup.defaultProps is used to assign a default value to the props, if one is not provided by the parent
If a prop value is provided by the parent, then the default value is overwritten

A text property signifies that it contains the text that will be displayed in the listgroup

*/

import React from 'react';
import PropTypes from 'prop-types';
import './ListContainer.css';

/**
 * Represents an individual list item.
 * @param {Object} props - Component props.
 * @param {string} props.name - Name of the item.
 * @param {string} props.description - Description of the item.
 * @param {Function} [props.onMoveItem] - Function to move the item.
 * @param {'left' | 'right' | 'both' | 'none'} [props.arrowDirection] - Direction of movement.
 * @param {Object} props.item - Item object.
 */
const ListItem = ({ name, description, onMoveItem, arrowDirection, item }) => (
  <div className="list-item">
    <div className="item-name"><b>{name}</b></div>
    <div className="item-description">{description}</div>
    {onMoveItem && (
      <div className="arrow-buttons">
        {(arrowDirection === 'left' || arrowDirection === 'both') && (
          <button
            className="arrow-button left"
            onClick={() => onMoveItem(item, 'left')}
            aria-label="Move item left"
            style={{ marginLeft: "auto" }}
          >
            ⬅
          </button>
        )}
        {(arrowDirection === 'right' || arrowDirection === 'both') && (
          <button
            className="arrow-button right"
            onClick={() => onMoveItem(item, 'right')}
            aria-label="Move item right"
          >
            ➡
          </button>
        )}
      </div>
    )}
  </div>
);

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onMoveItem: PropTypes.func,
  arrowDirection: PropTypes.oneOf(['left', 'right', 'both', 'none']),
  item: PropTypes.object.isRequired,
};

ListItem.defaultProps = {
  onMoveItem: null,
  arrowDirection: 'none',
};

/**
 * Represents a list container with items and controls.
 * @param {Object} props - Component props.
 * @param {string} props.title - Title of the list.
 * @param {Array} props.items - List of items.
 * @param {boolean} props.isChecked - Checkbox state.
 * @param {Function} props.onCheck - Function to handle checkbox change.
 * @param {Function} [props.onMoveItem] - Function to move an item.
 * @param {'left' | 'right' | 'both' | 'none'} [props.arrowDirection] - Direction of movement.
 */
const ListContainer = ({
  title,
  items,
  isChecked,
  onCheck,
  onMoveItem,
  arrowDirection,
}) => (
  <div className="list-container">
    <div className="list-header">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onCheck}
        aria-label={`Select ${title}`}
      />
      <h3>{title} ({items.length})</h3>
    </div>
    <ul className="list-items">
      {items.map((item) => (
        <li key={item.id}>
          <ListItem
            name={item.name}
            description={item.description}
            onMoveItem={onMoveItem}
            arrowDirection={arrowDirection}
            item={item}
          />
        </li>
      ))}
    </ul>
  </div>
);

ListContainer.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  isChecked: PropTypes.bool.isRequired,
  onCheck: PropTypes.func.isRequired,
  onMoveItem: PropTypes.func,
  arrowDirection: PropTypes.oneOf(['left', 'right', 'both', 'none']),
};

ListContainer.defaultProps = {
  onMoveItem: null,
  arrowDirection: 'none',
};

export default ListContainer;

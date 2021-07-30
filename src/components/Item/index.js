import React from 'react';

import './style.scss';

const Item = (props) => {
    return (
        <li className="item__content">
            <button className="item__remove" onClick={props.removeItem}>&#10006;</button>
            <img
                key={props.item.url}
                src={props.item.url}
                width={props.item.width}
                alt={props.item.url}
            />
        </li>
    );
};

export default Item;
import React from 'react';
import Item from '../Item';

import './style.scss';

const Row = (props) => {
    return (
        <ol className="row__item">
            {props.galleryImages.map(item => (
                <Item
                    item={item}
                    key={item.url}
                    removeItem={() => props.removeItem(item.url)}
                />
            ))}
        </ol>
    );
}

export default Row;
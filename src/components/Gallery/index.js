import React, {Component} from 'react';
import Row from '../Row';

import './style.scss'

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockWidth: 0,
        }
        this.galleryBlockRef = React.createRef();
    }

    componentDidMount(){
        this.setBlockWidth();
        window.addEventListener('resize', this.setBlockWidth);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.setBlockWidth);
    }

    setBlockWidth = () => {
        this.setState({blockWidth: this.galleryBlockRef.current.getBoundingClientRect()?.width});
    }

    canPlaceImageInRow = (rowWidth, occupiedWidth, imageWidth) => {
       return occupiedWidth + imageWidth <= rowWidth;
    }

    getRows = (rowWidth, itemHeight, data) => {
        return data.reduce((acc, image) => {
            const imageWidthByItemHeight = image.width * itemHeight / image.height;
            const currentRowIndex = acc.length - 1;
            const currentRowWidth = acc[currentRowIndex].width;
 
            if (this.canPlaceImageInRow(rowWidth, currentRowWidth, imageWidthByItemHeight)) {
                acc[currentRowIndex].width += imageWidthByItemHeight;
                acc[currentRowIndex].items.push(image);
            } else {
                acc.push({width: imageWidthByItemHeight, items: [image]})
            }
            return acc;
        }, [{width: 0, items: []}])
    }

    getFilledRows = (rowWidth, itemHeight, rows, margin) => {
        const getRowImagesWidthSum = (acc, image) => {
            const width = image.width * itemHeight / image.height;
            return acc + width
        }
        
        const getResizedImages = (row) => {
            const rowWidthWithoutMargin = rowWidth - (row.items.length - 1) * margin;
            const rowImagesWidthSum = row.items.reduce(getRowImagesWidthSum, 0);
            return row.items.reduce((acc, image) => {
                const widthProportion = image.width * itemHeight / image.height;
                const width = (widthProportion / rowImagesWidthSum * rowWidthWithoutMargin);
                return [...acc, {...image, width}]
            }, []);
        }
        return rows.map(getResizedImages)
    }

    render() {
        const root = document.querySelector(':root');

        const itemMargin = parseFloat(getComputedStyle(root).getPropertyValue('--item-margin'));
        const itemHeiht = getComputedStyle(root).getPropertyValue('--min-item-height');

        const rows = this.getRows(this.state.blockWidth, itemHeiht, this.props.galleryImages);
        const filledRows = this.getFilledRows(this.state.blockWidth, itemHeiht, rows, itemMargin);

        return (
            <div className="gallery__block" ref={this.galleryBlockRef}> 
                {filledRows.map((galleryImages, i) => (
                    <Row 
                        galleryImages={galleryImages} 
                        key={i}
                        removeItem={this.props.removeItem}
                    />
                ))}     
            </div>
        )
    }
};

export default Gallery;
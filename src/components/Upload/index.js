import React, {Component} from 'react';

import './style.scss';

class Upload extends Component{
    constructor(props){
        super(props)

        this.state = {drag: false}
    }

    dragStartHandler = (e) => {
        e.preventDefault();
        this.setState({drag: true})
    }

    dragLeaveHandler = (e) => {
        e.preventDefault();
        this.setState({drag: false})
    }

    onDropHandler = (e) => {
        e.preventDefault();
        const images = [...e.dataTransfer.files]
        images.forEach(img => {
            const formData = new Image()
            formData.src = window.URL.createObjectURL(img);
            formData.onload = () => {
                this.props.addItem(formData);
             }
        });

        this.setState({drag: false});
    }

    render(){
        const text = this.state.drag ? 'Отпустите изображение' : 'Перетащите изображение';

        return (
            <div className="upload__content">
                <div
                    className={`upload__drop-area ${this.state.drag ? 'upload__drop-area_active' : ''}`}
                    onDragStart={this.dragStartHandler}
                    onDragLeave={this.dragLeaveHandler}
                    onDragOver={this.dragStartHandler}
                    onDrop={this.onDropHandler}
                >
                    {text}
                </div>
            </div>
        );
    }
}

export default Upload;
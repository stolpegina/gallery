import React, {Component} from 'react';
import Gallery from './components/Gallery';
import Upload from './components/Upload';

import './App.scss';

class App extends Component{
  constructor(){
    super();

    this.state = {
      galleryImages:[]
    }
  }

  componentDidMount(){
    fetch('https://don16obqbay2c.cloudfront.net/frontend-test-task/gallery-images.json')
    .then(response => response.json())
    .then(({galleryImages}) => this.setState({galleryImages}));
  }

  addItem = (image) => {
    const gallery = this.state.galleryImages;
    gallery.push({
      width: image.width,
      height: image.height,
      url: image.src
    });
    this.setState({gallery})
  }

  removeItem = (id) => {
    const gallery = this.state.galleryImages.filter((image) => image.url !== id);
    this.setState({galleryImages: gallery});
  }

  render(){
    const {galleryImages} = this.state;
    
    return (
      <div className="App">
        <header className="App-header">
        <Gallery 
          galleryImages={galleryImages}
          removeItem={(i) => this.removeItem(i)}
        />
        <Upload addItem={this.addItem}/>
        </header>
      </div>
    );
  }  
}

export default App;

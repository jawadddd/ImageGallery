import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

function App() {
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', image);

    axios.post('http://localhost:8080/upload', formData)
      .then((res) => {
        console.log(res.data);
        fetchImages(); // Fetch the updated list of images
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const fetchImages = () => {
    axios.get('http://localhost:8080/images')
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label >Choose an image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit" className='btn2'>Upload</button>
      </form>

      <div className="images">
        <ul>
          {images.map((image, index) => (
            <li key={index}>
              <img src={image} alt={`Image ${index}`} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

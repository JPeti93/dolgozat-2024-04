import React, { useState } from 'react';
import './App.scss';
import colors from './_colors.scss';
import loadingImg from './loading.gif';

function Dog({ title, imageUrl, getNextImage }) {
  const [loading, setLoading] = useState(true);

  const [imageStyle, setImageStyle] = useState({});

  const setImageUrl = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const ratio = 500 / img.width;
      const width = Math.min(500, img.width);
      const height = img.height * ratio;
      setImageStyle({
        width: `${width}px`,
        height: `${height}px`,
        border: `12px solid ${colors.keret}`,
      });
      setLoading(false);
    };
  };

  return (
    <div className="dog-container">
      <h1 style={{ color: colors.betu }}>{title}</h1>
      {loading ? (
        <img src={loadingImg} alt="Loading" />
      ) : (
        <img src={imageUrl} alt="Dog" style={imageStyle} />
      )}
      <button style={{ backgroundColor: colors.gombHatter }} onClick={getNextImage}>Következő kép</button>
    </div>
  );
}

function App() {
  const [imageUrl, setImageUrl] = useState('');

  const getNextImage = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setImageUrl(data.message);
    } catch (error) {
      console.error('Hiba:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Dog title="Random kutya képe" imageUrl={imageUrl} getNextImage={getNextImage} />
      </header>
    </div>
  );
}

export default App;

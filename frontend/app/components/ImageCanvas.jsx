"use client"
import React, { useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageEditor = () => {
  const [image, setImage] = useState(null);
  const [brushColor, setBrushColor] = useState('#ffffff');
  const [drawing, setDrawing] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const canvasRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleMouseDown = () => {
    setDrawing(true);
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseMove = (e) => {
    if (drawing && image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      context.globalCompositeOperation = 'destination-out';
      context.fillStyle = brushColor;
      context.beginPath();
      context.arc(x, y, 10, 0, 2 * Math.PI);
      context.fill();
    }
  };
  const handleDownload = () => {
    const canvas = canvasRef.current;
    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'edited_image.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  useEffect(() => {
    if (image) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
    
      const img = new Image();
      img.src = image;

      img.onload = () => {
        canvas.width = 500;
        canvas.height = img.height*(500/img.width);

        context.drawImage(img, 0, 0, 500, img.height*(500/img.width));
      };
    }
  }, [image]);

  const handleEraserToggle = () => {
    if (image) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
      
        const img = new Image();
        img.src = image;
  
        img.onload = () => {
          canvas.width = 500;
          canvas.height = img.height*(500/img.width);
  
          context.drawImage(img, 0, 0, 500, img.height*(500/img.width));
        };
    }
  }


  return (
    <div>
      {!image?<div {...getRootProps()} style={dropzoneStyle} className=' w-full h-[40vh] flex flex-col justify-start items-center'>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the image here...</p> : <p>Drag and drop an image here, or click to select an image</p>}
      </div>:
      <button onClick={handleEraserToggle} style={{ marginLeft: '10px' }}>
      {'Discard Changes'}
    </button>}
      {image && (
        <div>
          {/* <label>
            Brush Color:
            <input type="color" value={brushColor} onChange={handleBrushColorChange} />
          </label> */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ border: '1px solid #000', marginTop: '10px' }}
          />
          <button onClick={handleDownload} style={{ marginTop: '10px' }}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: '20px',
};

export default ImageEditor;

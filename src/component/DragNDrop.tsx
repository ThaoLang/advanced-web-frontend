import React from 'react';
import {useDropzone} from 'react-dropzone';

interface ImageProp {
  imageUrl: string;
  saveImageUrl: (imageUrl: string) => void;
}

const dropzoneStyle = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  cursor: 'pointer',
  outerWidth: '40px'
};

function DragNDrop(props: ImageProp) {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {
        "image/*": [".png", ".gif", ".jpeg", ".jpg"],
      },
    onDrop: acceptedFiles => {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);
      props.saveImageUrl(fileUrl);
    }
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className='text-center'>Drop the image here...</p>
        ) : (
          <p className='text-center'>Drop an image here, or click to upload image</p>
        )}
      </div>
    </div>
  );
}

export default DragNDrop;
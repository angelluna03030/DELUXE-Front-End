import React, { useState } from 'react';

export const TablaCatalogo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Manejar la selección del archivo
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Manejar la carga del archivo
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('files', selectedFile);

    try {
      const response = await fetch('http://localhost:3000/public', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus(`Upload successful: ${result.data}`);
        console.log(result.data)
      } else {
        const errorData = await response.json();
        setUploadStatus(`Upload failed: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Upload Video</h1>
      <input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload}>Upload Video</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

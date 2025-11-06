import { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    // ✅ The class name is FormData, not formData
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData);

      const data = res.data;
      if (res.status === 200) {
        // backend returns `image` (URL) — adjust if your backend uses a different key
        setImageUrl(data.image || data.file || data.imageUrl || '');
        alert(data.message || 'File uploaded successfully!');
      } else {
        alert(data.message || `Upload failed: ${res.status}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Something went wrong during upload.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <h3>Enhanced Image:</h3>
          <img
            src={imageUrl}
            alt="Enhanced"
            style={{ width: '400px', borderRadius: '10px', marginTop: '10px' }}
          />
        </div>
      )}
    </div>
  );
}

export default FileUpload;

import React, { useState } from 'react';
import axios from 'axios';
import './styles/App.css';

const App = () => {
    const [url, setUrl] = useState('');
    const [format, setFormat] = useState('mp3');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [downloadLink, setDownloadLink] = useState('');

    const handleConvert = async () => {
        setLoading(true);
        setError('');
        setDownloadLink('');
        try {
            // Aquí es donde haces la solicitud al backend
            const response = await axios.post('http://127.0.0.1:5000/convert', {
                url,
                format,
            }, { responseType: 'blob' });

            // Crear un objeto URL a partir del blob recibido
            const blob = new Blob([response.data]);
            const link = URL.createObjectURL(blob);
            setDownloadLink(link);
        } catch (err) {
            setError('Error al convertir el video.');
        }
        setLoading(false);
    };

    return (
        <div className="app">
            <h1>Convertidor de YouTube</h1>
            <input
                type="text"
                placeholder="URL del video"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div>
                <label>
                    <input
                        type="radio"
                        value="mp3"
                        checked={format === 'mp3'}
                        onChange={() => setFormat('mp3')}
                    />
                    MP3
                </label>
                <label>
                    <input
                        type="radio"
                        value="mp4"
                        checked={format === 'mp4'}
                        onChange={() => setFormat('mp4')}
                    />
                    MP4
                </label>
            </div>
            <button onClick={handleConvert} disabled={loading}>
                {loading ? 'Convirtiendo...' : 'Convertir'}
            </button>
            {error && <p className="error">{error}</p>}
            {downloadLink && (
                <a href={downloadLink} download>
                    Descargar archivo
                </a>
            )}
        </div>
    );
};

export default App;

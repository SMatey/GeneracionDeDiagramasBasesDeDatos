import { useState } from 'react';
import axios from 'axios';

export const Body = () => {
    const [imageUrls, setImageUrls] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            host: document.getElementById('host').value,
            port: parseInt(document.getElementById('port').value, 10),
            user: document.getElementById('user').value,
            password: document.getElementById('password').value,
            dbName: document.getElementById('dbName').value,
            tipoBaseDatos: document.getElementById('tipoBaseDatos').value
        };

        try {
            const response = await axios.post('http://localhost:5000/generate-diagram', formData, {
                responseType: 'blob',
            });

            const imageUrl = URL.createObjectURL(response.data);
            setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
            setCurrentImageIndex(imageUrls.length);

        } catch (error) {
            console.error('Error al generar el diagrama:', error);
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleNextImage = () => {
        if (currentImageIndex < imageUrls.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = imageUrls[currentImageIndex];
        link.download = `diagram-${currentImageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <div className='BDData'>
                <h2>Generador de diagramas</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="host">Host</label>
                        <input className='form_input' type='text' placeholder='127.0.0.1' id="host" />
                    </div>
                    <div>
                        <label htmlFor="port">Port</label>
                        <input className='form_input' type='number' placeholder='3306' id="port" />
                    </div>
                    <div>
                        <label htmlFor="user">User Name</label>
                        <input className='form_input' type='text' placeholder='User Name' id="user" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='form_input' type='password' placeholder='Password' id="password" />
                    </div>
                    <div>
                        <label htmlFor="dbName">DB Name</label>
                        <input className='form_input' type='text' placeholder='DB Name' id="dbName" />
                    </div>

                    <div className="form_input">
                        <label>Data Base Type
                            <select className="type-of-db" id="tipoBaseDatos">
                                <option value="MySQL">MySQL</option>
                                <option value="Postgres">PostgreSQL</option>
                                <option value="SQLServer">SQL Server</option>
                            </select>
                        </label>
                    </div>

                    <div className='form_input' id='update'>
                        <button type='submit'>
                            Update
                        </button>
                    </div>
                    {imageUrls.length > 0 && (
                        <button type="button" onClick={handleDownloadImage}>
                            Descargar Imagen Actual
                        </button>
                    )}
                </form>
            </div>

            <div className='DiagramGenerate'>
                <h2>Diagrama Generado</h2>
                <div className='diagram-placeholder'>
                    {imageUrls.length > 0 ? (
                        <>
                            {/* Mostrar la imagen actual */}
                            <img src={imageUrls[currentImageIndex]} alt="Generated diagram" />
                        </>
                    ) : (
                        <p>No se ha generado ningún diagrama aún.</p>
                    )}
                     {/* Botones de navegación */}
                    <div className='nav-buttons'>
                        <button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                            ⬅️ Previous
                        </button>
                        <button onClick={handleNextImage} disabled={currentImageIndex === imageUrls.length - 1}>
                            Next ➡️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

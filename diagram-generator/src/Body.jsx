import { useState } from 'react';
import axios from 'axios';
import downloadIcon from './Icon/downloadIcon.svg';


export const Body = () => {
    const [diagrams, setDiagrams] = useState([]);  // Usamos un estado que guarda la URL y la información del diagrama
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
            
            // Agregamos el nuevo diagrama (URL + información de la base de datos) al estado
            setDiagrams((prevDiagrams) => [
                ...prevDiagrams,
                {
                    imageUrl,  // La URL de la imagen
                    host: formData.host,
                    port: formData.port,
                    user: formData.user,
                    dbName: formData.dbName,
                    tipoBaseDatos: formData.tipoBaseDatos,
                }
            ]);

            setCurrentImageIndex(diagrams.length);  // Actualizamos el índice para mostrar el diagrama recién generado

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
        if (currentImageIndex < diagrams.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = diagrams[currentImageIndex].imageUrl;
        link.download = `diagram-${currentImageIndex + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container">
            <div className='BDData'>
                <h2>Diagrama Generator</h2>
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
                    {diagrams.length > 0 && (
                        <button type="button" className="download-btn" onClick={handleDownloadImage}>
                            <img src={downloadIcon} alt="Download Icon" style={{ width: '20px', marginRight: '8px' }} />
                        </button>
                    )}
                </form>
            </div>

            <div className='DiagramGenerate'>
                <h2>Diagram Generated</h2>
                <div className='diagram-info'>
                    {diagrams.length > 0 && (
                        <>
                            {/* Mostrar la información de la base de datos correspondiente */}
                            <div className="db-info">
                                <p><strong>Host:</strong> {diagrams[currentImageIndex].host}</p>
                                <p><strong>Port:</strong> {diagrams[currentImageIndex].port}</p>
                                <p><strong>User Name:</strong> {diagrams[currentImageIndex].user}</p>
                                <p><strong>Database Name:</strong> {diagrams[currentImageIndex].dbName}</p>
                                <p><strong>Database Type:</strong> {diagrams[currentImageIndex].tipoBaseDatos}</p>
                            </div>
                        </>
                    )}
                </div>
                <div className='diagram-placeholder'>
                    {diagrams.length > 0 ? (
                        <>
                            {/* Mostrar la imagen actual */}
                            <img src={diagrams[currentImageIndex].imageUrl} alt="Generated diagram" />
                        </>
                    ) : (
                        <p>A diagram hasn't been gererated yet.</p>
                    )}
                    {/* Botones de navegación */}
                    <div className='nav-buttons'>
                        <button onClick={handlePreviousImage} disabled={currentImageIndex === 0}>
                            ⬅️ Previous
                        </button>
                        <button onClick={handleNextImage} disabled={currentImageIndex === diagrams.length - 1}>
                            Next ➡️
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

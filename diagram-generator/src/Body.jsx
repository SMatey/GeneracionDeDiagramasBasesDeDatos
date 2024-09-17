import { useState } from 'react';
import axios from 'axios';

export const Body = () => {
    const [diagramUrl, setDiagramUrl] = useState(null);  // Estado para almacenar la URL de la imagen generada

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

        // Recogemos los valores de los inputs
        const formData = {
            host: document.getElementById('host').value,
            port: parseInt(document.getElementById('port').value, 10),  // Convertir a número
            user: document.getElementById('user').value,
            password: document.getElementById('password').value,
            dbName: document.getElementById('dbName').value,
            tipo_base_datos: document.getElementById('tipo_base_datos').value
        };
        console.log('Datos enviados:', formData);
        try {
            // Realizar la solicitud POST al backend
            const response = await axios.post('http://localhost:5000/generar_diagrama', formData, {
                responseType: 'blob',  // Recibimos el archivo binario (imagen PNG)
            });

            // Crear una URL para el blob de la imagen recibida
            const imageUrl = URL.createObjectURL(response.data);
            setDiagramUrl(imageUrl);  // Guardar la URL de la imagen para mostrarla

        } catch (error) {
            console.error('Error al generar el diagrama:', error);
        }
    };

    return (
        <div className="container">
            <div className='BDData'>
                <h2>Generador de diagramas</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="host">Host</label>
                        <input className='form_input' type='text' placeholder='127.0.0.1' id="host"></input>
                    </div>
                    <div>
                        <label htmlFor="port">Port</label>
                        <input className='form_input' type='number' placeholder='3306' id="port"></input>
                    </div>
                    <div>
                        <label htmlFor="user">User Name</label>
                        <input className='form_input' type='text' placeholder='User Name' id="user"></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='form_input' type='password' placeholder='Password' id="password"></input>
                    </div>
                    <div>
                        <label htmlFor="dbName">DB Name</label>
                        <input className='form_input' type='text' placeholder='DB Name' id="dbName"></input>
                    </div>

                    <div className="form_input">
                        <label>Data Base Type
                            <select className="type-of-db" id="tipo_base_datos">
                                <option value="MySQL">MySQL</option>
                                <option value="Postgres">Postgres</option>
                                <option value="SQLServer">SQL Server</option>
                            </select>
                        </label>
                    </div>

                    <div className='form_input' id='update'>
                        <button type='submit'>
                            Update
                        </button>
                    </div>
                </form>
            </div>

            <div className='DiagramGenerate'>
                <h2>Diagrama Generado</h2>
                <div className='diagram-placeholder'>
                    {diagramUrl ? (
                        <img src={diagramUrl} alt="Diagrama Generado" style={{ width: '600px', height: 'auto' }} />
                    ) : (
                        <p>No se generó ningún diagrama aún.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

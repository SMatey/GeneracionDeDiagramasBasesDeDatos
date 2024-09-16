import { useState } from 'react';

export const Body = () => {
    //=============REQUIRED FUNCTIONS=================
    const [diagramUrl, setDiagramUrl] = useState(null);

    //Creamos la funcion que se envia la data al backend despues de oprimir el boton de actualizar
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevenir el comportamiento predeterminado del formulario

        // Capturamos los valores de los inputs usando sus ids
        const formData = {
            host: document.getElementById('host').value,
            port: parseInt(document.getElementById('port').value, 10), // Convertir a número
            user: document.getElementById('user').value,
            password: document.getElementById('password').value,
            dbName: document.getElementById('dbName').value,
            tipoBaseDatos: document.getElementById('tipoBaseDatos').value
        };

        try {
            const response = await axios.post('http://localhost:8000/generate-diagram', formData, {
                responseType: 'blob',
            });

            const imageUrl = URL.createObjectURL(response.data);
            setDiagramUrl(imageUrl);  // Guardar la URL de la imagen para mostrarla
        } catch (error) {
            console.error('Error al generar el diagrama:', error);
        }
    };

    //=============HTML BODY=================
    //<!--Cambiar los placesHolder-->
    return (
    <>
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
                            <select className="type-of-db">
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
                </form>
            </div>

            <div className='DiagramGenerate'>
                <h2>Diagrama Generado</h2>
                <div className='diagram-placeholder'>
                    {diagramUrl ? (
                        <img src={diagramUrl} alt ="Diagrama Generado"/>
                    ): (
                        <p>No se genero ningun diagrama aun.</p>
                    )}
                </div>
            </div>
        </div>
    </>
    )
}

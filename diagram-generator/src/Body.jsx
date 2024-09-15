import { useState } from 'react';
import PropTypes from 'prop-types';

export const Body = () => {
    //=============REQUIRED FUNCTIONS=================


    //=============HTML BODY=================
    //<!--Cambiar los placesHolder-->
    return (
    <>
        <div className="container">
            <div className='BDData'>
                <h2>Generador de diagramas</h2>
                <form>
                    <div>
                        <label htmlFor="host">Host</label>
                        <input className='form_input' type='text' placeholder='Host' id="host"></input>
                    </div>
                    <div>
                        <label htmlFor="port">Port</label>
                        <input className='form_input' type='number' placeholder='Port' id="port"></input>
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
                        <label>Tipo de Base de Datos
                            <select className="type-of-db">
                                <option value="MySQL">MySQL</option>
                                <option value="Postgres">PostgreSQL</option>
                                <option value="SQLServer">SQL Server</option>
                            </select>
                        </label>
                    </div>

                    <div className='form_input' id='update'>
                        <button type='submit'>
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>

            <div className='DiagramGenerate'>
                <h2>Diagrama Generado</h2>
                <div className='diagram-placeholder'>
                    {/* Aquí se mostrará el diagrama */}
                </div>
            </div>
        </div>
    </>
    )
}

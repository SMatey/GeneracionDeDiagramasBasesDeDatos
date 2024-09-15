import { useState } from 'react';
import PropTypes from 'prop-types';

export const Body = () => {
    //=============REQUIRED FUNCTIONS=================
    return (
        <>
            <body>
                <form className='formulario'>
                    <h2>Generador de diagramas</h2>
                    <input className='form_input' type='text' placeholder='Host'></input>
                    <input className='form_input' type='number' placeholder='Port'></input>
                    <input className='form_input' type='text' placeholder='User Name'></input>
                    <input className='form_input' type='text' placeholder='Password'></input>
                    <input className='form_input' type='text' placeholder='DB Name'></input>
                </form>
            </body>
        </>
    )
}

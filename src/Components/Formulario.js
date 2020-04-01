import React, { useState } from 'react';

const Formulario = ({guardarBusquedaletra}) => {
    //
    const [busqueda, guardarBusqueda] = useState({
        artista: '',
        cancion: ''
    });
    const [error, guardarError] = useState(false);

    //Funcion a cada input para leer su contenido
    const actualizarState = (e) => {
        guardarBusqueda({
            ...busqueda,
            [e.target.name]: e.target.value
        })
    }

    const {artista, cancion} = busqueda;
    //Consultar las apis
    const buscarInfomacion = (e) => {
        e.preventDefault();
        //Validar
        if(artista.trim() === '' || cancion.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Mandar los datos al componente principal
        guardarBusquedaletra(busqueda);
    }
    return (
        <div className="bg-info">
            <div className="container">
                <div className="row">
                    
                    <form 
                        className="col card text-white bg-transparent mb-5 pt-5 pb-2"
                        onSubmit={buscarInfomacion}
                    >
                        <fieldset>
                            <legend className="text-center">Buscador Letras Canciones</legend>
                            {error ? <p className="alert alert-danger text-center p-2">Todos los campos son obligatorios</p> : null}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Artista</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="artista"
                                            placeholder="Nombre Artista"
                                            onChange={actualizarState}
                                            value={artista}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Canción</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="cancion"
                                            placeholder="Nombre Canción"
                                            onChange={actualizarState}
                                            value={cancion}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary float-right"
                            >Buscar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default Formulario;
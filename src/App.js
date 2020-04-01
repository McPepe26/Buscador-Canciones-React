import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './Components/Formulario';
import Axios from 'axios';
import Cancion from './Components/Cancion';
import Info from './Components/Info';

function App() {

	const [busquedaletra, guardarBusquedaletra] = useState({});
	const [letra, guardarLetra] = useState('');
	const [info, guardarInfo] = useState({});

	useEffect(() => {
		if(Object.keys(busquedaletra).length === 0) return;
		const consultarApiLetra = async () => {
			const {artista, cancion} = busquedaletra;
			const url = `https://api.lyrics.ovh/v1/${artista}/${cancion}`;
			const url2 = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artista}`;
			const [letra, informacion] = await Promise.all([
				Axios.get(url),
				Axios.get(url2)
			])
			guardarLetra(letra.data.lyrics);
			guardarInfo(informacion.data.artists[0]);
		}

		consultarApiLetra();
	}, [busquedaletra, info])
	return (
		<Fragment>
			<Formulario
				guardarBusquedaletra = {guardarBusquedaletra}
			/>
			<div className="container mt-5">
				<div className="row">
					<div className="col-md-6">
						<Info
							info={info}
						/>
					</div>
					<div className="col-md-6">
						<Cancion
							letra={letra}
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default App;

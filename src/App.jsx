import './assets/css/main.css';
import './assets/css/index.css';

import Contador from './assets/components/Contador';
import Personaje from './assets/components/Personaje';

import { useState, useEffect } from 'react';

const App = () => {
  const [fondo, setFondo] = useState(false);
  const [datos, setDatos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [especie, setEspecie] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // ============================
  // CONSULTA A LA API
  // ============================

  useEffect(() => {
    const obtenerPersonajes = async () => {
      setCargando(true);
      setError('');

      try {
        // Creamos los parámetros solamente cuando tienen valor
        const parametros = new URLSearchParams();

        if (busqueda.trim() !== '') {
          parametros.append('name', busqueda.trim());
        }

        if (especie !== '') {
          parametros.append('species', especie);
        }

        const url = parametros.toString()
          ? `https://rickandmortyapi.com/api/character/?${parametros.toString()}`
          : 'https://rickandmortyapi.com/api/character';

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
          if (respuesta.status === 404) {
            setDatos([]);
            setError('No se encontraron personajes.');
            return;
          }

          throw new Error('Error al consultar la API');
        }

        const respuestaJSON = await respuesta.json();

        setDatos(respuestaJSON.results || []);

      } catch (error) {
        console.error(error);
        setDatos([]);
        setError('No se pudieron cargar los personajes.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPersonajes();

  }, [busqueda, especie]);


  // ============================
  // CAMBIAR FONDO
  // ============================

  const btn_fondo = () => {
    setFondo(!fondo);
  };


  // ============================
  // LIMPIAR FILTROS
  // ============================

  const limpiarFiltros = () => {
    setBusqueda('');
    setEspecie('');
  };


  return (
    <div className={fondo ? 'app fondo-oscuro' : 'app'}>

      {/* ============================
          ENCABEZADO
      ============================ */}

      <header className="header">

        <div className="header-contenido">

          <div className="logo">
            <div>
              <h1>Rick & Morty</h1>
            </div>

          </div>


          <button
            onClick={btn_fondo}
            className="btn-tema"
          >
            {fondo ? 'Modo claro' : 'Modo oscuro'}
          </button>

        </div>

      </header>


      {/* ============================
          CONTENIDO
      ============================ */}

      <main className="contenido">


        {/* ============================
            CONTADORES
        ============================ */}

        <section className="seccion-contadores">


          <div className="contadores">

            <div className="contador-card">
              <Contador
                limite={8}
                minimo={-1}
                cambio={2}
              />
            </div>

            <div className="contador-card">
              <Contador
                limite={15}
                minimo={5}
                cambio={5}
              />
            </div>

            <div className="contador-card">
              <Contador />
            </div>

          </div>

        </section>


        {/* ============================
            BUSCADOR
        ============================ */}

        <section className="buscador-section">

          <div className="titulo-principal">


            <h2>Personajes de Rick & Morty</h2>

            <p>
              Busca por nombre o selecciona una especie
            </p>

          </div>


          <div className="filtros">

            {/* BUSCAR POR NOMBRE */}

            <div className="campo">

              <label>
                Buscar personaje
              </label>

              <div className="input-contenedor">

                <input
                  type="text"
                  value={busqueda}
                  onChange={(evento) =>
                    setBusqueda(evento.target.value)
                  }
                  placeholder="Ejemplo: Rick, Morty, Jerry..."
                />

                {busqueda !== '' && (
                  <button
                    className="btn-limpiar-input"
                    onClick={() => setBusqueda('')}
                  >
                    ✕
                  </button>
                )}

              </div>

            </div>


            {/* SELECCIONAR ESPECIE */}

            <div className="campo">

              <label>
                Seleccionar especie
              </label>

              <select
                value={especie}
                onChange={(evento) =>
                  setEspecie(evento.target.value)
                }
              >

                <option value="">
                  Todas las especies
                </option>

                <option value="Human">
                  Human
                </option>

                <option value="Alien">
                  Alien
                </option>

                <option value="Humanoid">
                  Humanoid
                </option>

                <option value="Poopybutthole">
                  Poopybutthole
                </option>

                <option value="Mythological">
                  Mythological
                </option>

                <option value="Animal">
                  Animal
                </option>

                <option value="Robot">
                  Robot
                </option>

                <option value="Cronenberg">
                  Cronenberg
                </option>

                <option value="Disease">
                  Disease
                </option>

              </select>

            </div>

          </div>


          {/* BOTÓN LIMPIAR */}

          {(busqueda !== '' || especie !== '') && (

            <div className="filtros-activos">

              <span>
                Filtro:
                {' '}
                {busqueda !== '' && `"${busqueda}"`}
                {' '}
                {especie !== '' && `Especie: ${especie}`}
              </span>

              <button onClick={limpiarFiltros}>
                Limpiar filtros
              </button>

            </div>

          )}

        </section>


        {/* ============================
            RESULTADOS
        ============================ */}

        <section className="resultados">

          {cargando && (

            <div className="mensaje">

              <div className="spinner"></div>

              <p>
                Buscando personajes...
              </p>

            </div>

          )}


          {!cargando && error && (

            <div className="mensaje error">

              <h3>{error}</h3>

              <p>
                Prueba con otro nombre o especie.
              </p>

            </div>

          )}


          {!cargando && !error && (

            <>

              <div className="resultado-titulo">

                <h3>
                  {datos.length} personajes encontrados
                </h3>

              </div>


              <div className="personajes-grid">

                {datos.map(
                  ({
                    id,
                    name,
                    gender,
                    species,
                    image,
                  }) => (

                    <Personaje
                      key={id}
                      image={image}
                      name={name}
                      gender={gender}
                      species={species}
                    />

                  )
                )}

              </div>

            </>

          )}

        </section>

      </main>


      {/* ============================
          FOOTER
      ============================ */}

      <footer className="footer">

        <p>
          Rick & Morty API • Proyecto React
        </p>

      </footer>

    </div>
  );
};

export default App;
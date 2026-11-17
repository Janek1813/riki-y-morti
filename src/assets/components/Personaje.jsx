const Personaje = ({
  image,
  name,
  gender,
  species,
}) => {

  return (
    <article className="personaje-card">

      <div className="imagen-personaje">

        <img
          src={image}
          alt={name}
          loading="lazy"
          onError={(evento) => {
            evento.currentTarget.style.display = 'none';
          }}
        />

      </div>


      <div className="personaje-info">

        <h3>{name}</h3>

        <div className="dato">
          <strong>Especie:</strong>
          <span>{species}</span>
        </div>

        <div className="dato">
          <strong>Género:</strong>
          <span>{gender}</span>
        </div>

      </div>

    </article>
  );
};

export default Personaje;

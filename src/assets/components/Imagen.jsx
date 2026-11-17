import { useRef } from "react";

const Imagen = ({ img, titulo, descripcion, color = "#e1f5e1", oscuro = false }) => {
  const refCard = useRef(null);

  setTimeout(() => {
  if (refCard.current) {
    refCard.current.style.background = color;
    refCard.current.style.border = `3px solid ${color}`;
  }
}, 500);

  return (
    <div className="col-3 mb-3">
      <div
        ref={refCard}
        id="card"
        className="card"
        style={{ transition: "background 0.5s, border 0.5s" }}>
        <div className="card-img">
          <img className="mx-auto d-block" src={img} alt={titulo}
          style={{ width: "100%", height: 350, objectFit: "cover" }}/>
        </div>
        <div className="card-body text-center text-white">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text text-white" style={{ color: "#fff" }}>{descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default Imagen;
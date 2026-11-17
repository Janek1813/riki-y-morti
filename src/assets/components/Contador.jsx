import { useState } from "react";

const Contador = ({limite=10,minimo=0,cambio=1}) => {
    const [contador, setContador] = useState(0);
    return (
        <div className="col text-center">
            <p className='lead'>Contador</p>
            <button className='btn btn-primary btn-sm mx-2' onClick={() => setContador((contador - cambio)
                 < minimo ? limite : contador - cambio)}>-</button>
            <span>{contador}</span>
            <button className='btn btn-primary btn-sm mx-2' onClick={() => setContador((contador + cambio)
                 > limite  ? minimo : contador + cambio)}>+</button>
        </div>
    )
}
export default Contador;
import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';


function App() {

  //Citas en el local Storage

  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }


  //Arreglo de Citas

  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect para realizar ciertas operaciones cuando el state cambia

  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));//Declarando la dependencia dentro del arrowfunction para evitar el Warning de dependencias

    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    }else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  },[citas]);//escucha cada vez que el state de citas cambia  
  
  //Funcion que tome las citas actuales y agregue la nueva

  const crearCita = cita => {
    guardarCitas([
      ...citas,       //realizamos una copia del state Citas
      cita           //le agregamos la nueva cita
    ]);
  }

  //Funcion que elimina las citas por el ID

  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas)
  }

  //Mensaje condicional "Administra tus Citas"

  const titulo = citas.length === 0 ? 'No hay Citas' : 'Administra tus Citas';

  //Prueba contador

  // const [contador, setContador] = useState(0);

  // const sumar = () => {
  //   const sumaContador = contador + 1;
  //   setContador(sumaContador);
  // }

  // const restar = () => {
  //   const restaContador = contador - 1;
  //   setContador(restaContador);
  // }
  

  return (
    <Fragment>
    
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
          <Formulario
            crearCita={crearCita}
          />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
        {/* <h2>Contador</h2>
        <p>Contador: {contador}</p>
        <div>
            <input 
            type="button"
            value="sumar"
            className="button-primary"
            onClick={sumar}
            />
            <input 
            type="button"
            value="restar"
            className="button-primary"
            onClick={restar}
            />
        </div> */}
      </div>

    </Fragment>
    
  );
}

export default App;

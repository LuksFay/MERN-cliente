import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Barra from '../layout/Barra'
import FormTask from '../tasks/FormTask'
import ListadoTask from '../tasks/ListadoTask'
import AuthContext from '../../context/auth/authContext'

function Proyectos() {

    //extraer la informacion de autentificacion
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
       usuarioAutenticado();
    }, [])

    return (
        <div className="contenedor-app">
            <Sidebar/>

            <div className="seccion-principal">

                <Barra/>

                <main>
                    <FormTask/>
                    <div className="contenedor-tareas">
                        <ListadoTask/>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Proyectos

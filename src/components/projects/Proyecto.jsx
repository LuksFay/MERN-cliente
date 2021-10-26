import React, {useContext} from 'react'
import ProyectoContext from '../../context/projects/ProyectoContext';
import TaskContext from '../../context/tasks/TaskContext';

function Proyecto({proyecto}) {

    //Obtener el state del formulario

    const proyectosContext = useContext(ProyectoContext);
    const {proyectoActual} = proyectosContext;

    // obtener la funcion del context de tarea
    const tareasContext = useContext (TaskContext)
    const {obtenerTareas} = tareasContext


    //funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id); //fijar un proyecto actual
        obtenerTareas(id); //fijar las tareas cuando se de click
    }


    return (
        <li>
            <button type="button" className="btn btn-blank" onClick={()=>seleccionarProyecto(proyecto._id)}>
                {proyecto.nombre}
            </button>
        </li>
    )
}

export default Proyecto

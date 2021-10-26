import React, {useContext} from 'react'
import Task from './Task'
import ProyectoContext from '../../context/projects/ProyectoContext'
import TaskContext from '../../context/tasks/TaskContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

function ListadoTask() {

    // extraer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext

    // obtener las tareas del proyecto
    const tareasContext = useContext (TaskContext)
    const {tareasproyecto} = tareasContext

    // si no hay proyecto seleccionado
    if(!proyecto) return <h2>Selecciona un proyecto</h2>

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    //eliminar un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
        <ul className="listado-tareas">
            {tareasproyecto.lenght === 0
                ? (<li className="tarea"><p>No hay tareas</p></li>)
                :  <TransitionGroup>
                        {tareasproyecto.map(tarea  => (
                            <CSSTransition  key={tarea.id} timeout={250} classNames="tarea">
                                <Task tarea={tarea}/>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
            }
        </ul>
        <button type="button" className="btn btn-eliminar" onClick={onClickEliminar}>Eliminar Proyecto &times;</button>
        </>
    )
}

export default ListadoTask

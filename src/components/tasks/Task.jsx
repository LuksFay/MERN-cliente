import React, {useContext} from 'react'
import TaskContext from '../../context/tasks/TaskContext'
import ProyectoContext from '../../context/projects/ProyectoContext';


function Task({tarea}) {


     // extraer si un proyecto esta activo
     const proyectosContext = useContext(ProyectoContext);
     const {proyecto} = proyectosContext

     // obtener la funcion del context de tarea
     const tareasContext = useContext (TaskContext)
     const {eliminarTarea, obtenerTareas, cambiarEstadoTarea, guardarTareaActual} = tareasContext


    //extraer el proyecto
    const [proyectoActual] = proyecto;

     //funcion que se ejetura cuado el usuario presiona el btn eliminar tarea
     const tareaEliminar = id => {
        eliminarTarea(id);
        obtenerTareas(proyectoActual.id);
     }
     
     //funcion que modifica el estado de las tareas 
     const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        }else{
            tarea.estado = true;
        }
        cambiarEstadoTarea(tarea);
     }


     //agrega una tarea actual cuando el usuario desea editarla
     const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
     }

    return (
        <>
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>
            <div className="estado">
                {tarea.estado 
                ? 
                    (<button type="button" className="completo" onClick={() => cambiarEstado(tarea)}>Completo</button>)
                    
                : 
                    (<button type="button" className="incompleto" onClick={() => cambiarEstado(tarea)}>Incompleto</button>)
                }
            </div>

            <div className="acciones">
                <button className="btn btn-primario" type="button" onClick={() => seleccionarTarea(tarea)}>Editar</button>
                <button className="btn btn-secundario" type="button" onClick={() => tareaEliminar(tarea.id)}>Eliminar</button>
            </div>
        </li>
        </>
    )
}

export default Task

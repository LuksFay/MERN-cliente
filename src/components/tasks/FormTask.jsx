import React,{useContext, useState, useEffect} from 'react'
import ProyectoContext from '../../context/projects/ProyectoContext'
import TaskContext from '../../context/tasks/TaskContext';


function FormTask() {


    // extraer si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext


      // obtener la funcion del context de tarea
      const tareasContext = useContext (TaskContext)
      const {tareaseleccionada, errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext


    // effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada !== null){
           setTarea(tareaseleccionada)
        }else{
            setTarea({
                nombre: ''
            })
        }
    }, [tareaseleccionada]);

    // state del formulario

    const [ tarea, setTarea] = useState({
        nombre: ''
    })

    // extraer el nombre del proyecto

    const {nombre} = tarea

    // si no hay proyecto seleccionado

    if(!proyecto) return null;

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;


    //leer los valores del formulario
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }


    const onSubmit = e => {
        e.preventDefault();

        //validar
        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        //Si es edicion o si es nueva tarea 
        if(tareaseleccionada === null) {
            //agregar la nueva tarea al state de tareas
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea(tarea);
        }else {
            //actualizar tarea existente
            actualizarTarea(tarea);

            //elimina tarea seleccionada del state
            limpiarTarea()
        }

        


        // obtener y filtrar las tareas del pryecto actual
        obtenerTareas(proyectoActual.id);

        //reiniciar el form
        setTarea({
            nombre:''
        })
    }

    return (
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input type="text" className="input-text" placeholder="Nombre Tarea..." name="nombre" value={nombre} onChange={handleChange}/>
                </div>

                <div className="contenedor-input">
                    <input type="submit" className="btn btn-primario btn-submit btn-block" value={tareaseleccionada ? 'Editar Tarea' : "Agregar tarea"} />
                </div>
            </form>  
            {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    )
}

export default FormTask

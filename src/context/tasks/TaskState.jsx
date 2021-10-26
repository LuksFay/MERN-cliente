import React, {useReducer} from 'react';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import {v4 as uuidv4} from 'uuid';
import {TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, ELIMINAR_TAREA, ESTADO_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA, LIMPIAR_TAREA} from '../../types';

const TaskState = props => {
    const initialState = {
        tareas: [
            {id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 3, nombre: 'Elegir Plataforma de Pago', estado: false, proyectoId: 3},
            {id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4},
            {id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1},
            {id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2},
            {id: 7, nombre: 'Elegir Plataforma de Pago', estado: false, proyectoId: 3},
            {id: 8, nombre: 'Elegir Plataforma', estado: true, proyectoId: 3},
            {id: 9, nombre: 'Elegir Colores', estado: false, proyectoId: 4},
            {id: 10, nombre: 'Elegir Plataforma de Pago', estado: false, proyectoId: 3},
        ],
        tareasproyecto: null,
        errortarea: false,
        tareaseleccionada: null
    }
 
    
    //crear dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);


    //crear las funciones 

    //obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {
        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        })
    }

    // agregar ua tarea al proyecto seleccionado
    const agregarTarea = tarea => {
        tarea.id = uuidv4()
        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        })
    }


    //Valida y muestra un error en caso de que sea necesario

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //eliminar tarea por ir
    const eliminarTarea = id => {
        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        })
    }

    // cambia el estado de cada tarea
    const cambiarEstadoTarea = tarea => {
        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        })
    }

    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    //edita o modifica una tarea
    const actualizarTarea = tarea => {
        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        })
    }

    //elimina la tarea seleccionada
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return(
        <TaskContext.Provider value={{tareas: state.tareas, obtenerTareas, tareasproyecto: state.tareasproyecto, errortarea: state.errortarea, tareaseleccionada: state.tareaseleccionada, agregarTarea, validarTarea, eliminarTarea, cambiarEstadoTarea, guardarTareaActual, actualizarTarea, limpiarTarea}}>
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState
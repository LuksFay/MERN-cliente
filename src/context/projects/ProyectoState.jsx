import React, {useReducer} from 'react';
import proyectoContext from './ProyectoContext';
import proyectoReducer from './ProyectoReducer';
import { FORMULARIO_PROYECTO, OBTENER_PROYECTOS, AGREGAR_PROYECTO, VALIDAR_FORMULARIO, PROYECTO_ACTUAL, ELIMINAR_PROYECTO, PROYECTO_ERROR} from '../../types';
import clienteAxios from '../../config/axios'
// import {v4 as uuidv4} from 'uuid';



const ProyectoState = (props) => {

    const proyectos = [
        // {id: 1, nombre: 'tienda virtual'},
        // {id: 2, nombre: 'Intranet'},
        // {id: 3, nombre: 'Diseño de sitio web'},
        // {id: 4, nombre: 'MERN'}
    ]

    const initialState = {
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null,
        mensaje: null
    } 


    // dispacth para ejectuar las acciones

    const [state, dispatch] = useReducer(proyectoReducer, initialState);

    // series de funciones para el CRUD

    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    //obtener los proyectos

    const obtenerProyectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos');
            
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            console.log(error);
        }
    }

    //agregar nuevo proyecto
    const agregarProyecto = async proyecto => {
        // proyecto.id = uuidv4()

        try {
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
           console.log(resultado)
           // insertar el proyecti en el state
           dispatch({
               type: AGREGAR_PROYECTO,
               payload: resultado.data
           })
        } catch (error) {
            console.log(error)
        }
    }


    //validar el formulario por errores

    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    // selecciona el proyecto al que el usuario dio click
    const proyectoActual = proyectoId => {
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    //elimina un proyecto
    const eliminarProyecto = async proyectoId => {
       try {
           await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
           dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        })
       } catch (error) {
        //    console.log(error);
            const alerta = {
                msg: 'Hubo un error',
                categoria: 'alerta-error'
                //MIRAR DE NUEVO LOS ULTIMOS MINUTOS DEL VIDEO 
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
       }
    }

    return(
        <proyectoContext.Provider
        value={{
            proyectos: state.proyectos,
            formulario: state.formulario,
            errorformulario: state.errorformulario,
            proyecto: state.proyecto,
            mensaje: state.mensaje,
            mostrarFormulario,
            obtenerProyectos,
            agregarProyecto,
            mostrarError,
            proyectoActual,
            eliminarProyecto
        }}>

           

            {props.children}
        </proyectoContext.Provider>
    )
}

export default ProyectoState
import React, {useContext, useEffect} from 'react'
import Proyecto from './Proyecto'
import ProyectoContext from '../../context/projects/ProyectoContext'; 
import AlertaContext from '../../context/alertas/alertaContext'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import alertaContext from '../../context/alertas/alertaContext';
function ListadoProyectos() {

    //etrarer proyectos de state inicial
    const proyectosContext = useContext(ProyectoContext);
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext;

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext

    // obtener proyectos cuado carga el componente
    useEffect(()=>{
        // si hay un error
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        // eslint-disable-next-line
    }, [mensaje])


    //revisar si proyecto tiene contenidos
    if(proyectos.length === 0){
        return (
        <p> No hay proyectos, comienza creando uno </p>
        )
    } 

    return (
        <ul className="listado-proyectos">
            {alerta ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> : null}
               <TransitionGroup>
                    {proyectos.map(proyecto => (
                        <CSSTransition key={proyecto._id} timeout={250} classNames="proyecto">
                            <Proyecto proyecto={proyecto}/>
                        </CSSTransition>
                    ))}
               </TransitionGroup>
        </ul>
    )
}

export default ListadoProyectos

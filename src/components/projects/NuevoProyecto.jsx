import React, {useState, useContext} from 'react';
import ProyectoContext from '../../context/projects/ProyectoContext';

function NuevoProyecto() {

    //Obtener el state del formulario

    const proyectosContext = useContext(ProyectoContext);
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext



    //state para el proyecto

    const [proyecto, setProyecto] = useState({
        nombre: ''
    });

    // Extraer 'nombre' de 'proyecto'

    const {nombre} = proyecto;


    // lee los contenidos del input
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }


    //cuando el usuario envia un proyecto
    const onSubmitProyecto = e => {
        e.preventDefault();

        //valiar el proyecto

        if(nombre === ''){
            mostrarError();
            return;
        }

        //agregar al state

        agregarProyecto(proyecto)

        //reiniciar el form
        setProyecto({
            nombre: ''
        })
    }

    //Mostrar el formulario

    const onClickFormulario = () => {
        mostrarFormulario();
    }

    return (

        <>
        <button type="button" className="btn btn-block btn-primario" onClick={onClickFormulario}>
            Nuevo Proyecto
        </button>

        {
            formulario
            ?(
                <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
                    <input type="text" className="input-text" placeholder="Nombre proyecto" name="nombre" value={nombre} onChange={onChangeProyecto}/>
                    <input type="submit" className="btn btn-primario btn-block" value="Agregar proyecto" />
                </form>
                
            )

            :null
        }

        {errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>: null}

        </>
    )
}

export default NuevoProyecto

import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/auth/authContext';

const NuevaCuenta = (props) => {

    //extraer los alores del context

    const alertaContext = useContext(AlertaContext);
    const {alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const {mensaje, autenticado, registrarUsuario} = authContext;

    // en caso de que el usuario se haya autenticado o registrado o sea un registro duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg.msg, mensaje.categoria);
        }
    }, [mensaje, autenticado, props.history])

    //state para iniciar sesion

    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    // extraer de usuario

    const {nombre, email, password, confirmar} = usuario

    const onchange = (e) =>{
        setUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    // cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        //validar que no haya campos vacios
        if(
            nombre.trim()  === '' ||
            email.trim()  === '' ||
            password.trim()  === '' ||
            confirmar.trim()  === '' 
        ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return
        }

        // passwrd minimo de 6 caracteres
        if(password.length < 6){
            mostrarAlerta('El password debe ser de al menos 6 caracteres', 'alerta-error');
            return
        }
        

        // ambos passwors iguales
        if(password !== confirmar) {
            mostrarAlerta('Los passwords no son iguales', 'alerta-error');
            return
        }

        //pasar al action
        registrarUsuario({
            nombre, email, password
        })

    }

    return (
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>
                <form onSubmit={onSubmit}>
                    
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" value={nombre} onChange={onchange} />
                    </div>
                    
                    
                    
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Tu email" value={email} onChange={onchange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" placeholder="Tu contraseña" value={password} onChange={onchange} />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input type="password" id="confirmar" name="confirmar" placeholder="Repite tu contraseña" value={confirmar} onChange={onchange} />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme" />
                    </div>

                </form>

                <Link to={'/'} className="enlace-cuenta">Volver a iniciar sesión</Link>
            </div>
        </div>
    )
}

export default NuevaCuenta;


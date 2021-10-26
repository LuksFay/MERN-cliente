import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/projects/Proyectos';
import ProyectoState from './context/projects/ProyectoState';
import TaskState from './context/tasks/TaskState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import RutaPrivada from './components/routes/RutaPrivada';

// revisar si tenemos un token
const token = localStorage.getItem('token');
if(token){
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProyectoState>
      <TaskState>
        <AlertaState>
          <AuthState>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                    <RutaPrivada exact path="/proyectos" component={Proyectos} />
                </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TaskState>
    </ProyectoState>
  );
}

export default App;

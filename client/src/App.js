import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import {LandingPage, Home, Detalle, Formulario} from './componentes';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import Detalle from './componentes/Detalle';
import Formulario from './componentes/Formulario';
import Hola from './componentes/Hola';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route exact path= '/recipes' component= {Formulario}/>
        <Route path= "/detail/:id" component={Detalle}/>
        <Route path= '/hola' component ={Hola}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

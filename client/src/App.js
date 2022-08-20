import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//import {LandingPage, Home, Detalle, Formulario} from './componentes';
import LandingPage from './componentes/LandingPage';
import Home from './componentes/Home';
import Detalle from './componentes/Detalle';
import Formulario from './componentes/Formulario';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= '/' component= {LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route exact path= '/recipes' componenet= {Formulario}/>
        <Route path= 'detalle/:id' componenet={Detalle}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

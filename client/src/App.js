import {BrowserRouter,Route,Switch} from 'react-router-dom' 
import RegForm from './components/RegForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path = '/registrationform' component={RegForm}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

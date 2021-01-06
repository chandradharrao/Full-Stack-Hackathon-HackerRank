import {BrowserRouter,Route,Switch} from 'react-router-dom' 
import RegForm from './components/RegForm';
import Navbar from './components/Navbar';
import SuccessPage from './components/SuccessPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path = '/registrationform' component={RegForm}/>
        <Route path = '/successpage/:id' component={SuccessPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

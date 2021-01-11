import {BrowserRouter,Route,Switch} from 'react-router-dom' 
import RegForm from './components/RegForm';
import Navbar from './components/Navbar';
import SuccessPage from './components/SuccessPage';
import SignIn from './components/SignIn';
import Menu from "./components/Menu";
import Payment from "./components/Payment";
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path = "/signin" component={SignIn}/>
        <Route path = '/signup' component={RegForm}/>
        <Route path = '/successpage/:id/:empid' component={SuccessPage}/>
        <Route path = "/menu" component={Menu}/>
        <Route path = "/payment" component={Payment}/>
        <Route path = "/" component = {Home}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

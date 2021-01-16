import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar';
import Routing from './components/Routing';
//import the reducer function and the state
import {UserDetailsState,UserDetailsReducer} from "./reducers/userDetailsReducer"
import {createContext,useReducer} from 'react';

//create context(returns an obj with 2 values : consumer and provider)
//context will provide consumers access to state and dispatch function
export const UserDetailsContext = createContext()

function App() {
  //grab the sipatch function and state to be passed an value to consumers
  const [state,dispatch] = useReducer(UserDetailsReducer,UserDetailsState);
  return (
    <UserDetailsContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        <Routing/>
      </BrowserRouter>
    </UserDetailsContext.Provider>
  );
}

export default App;

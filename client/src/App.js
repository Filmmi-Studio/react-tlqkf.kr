
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainPage from './components/MainPage/MainPage';
import NavigationBar from "./components/Navigation/NavigationBar";
import Search from './components/SearchPage/SearchPage';
import AuthIcon from "./components/RegisterPage/AuthIcon";
import Test from './components/test/test'


function App() {
  return (
    <Router>

        <Switch>
          <Route exact path='/' component={MainPage}/>
          <Route exact path='/search/:String' component={Search}/>
          <Route exact path='/register/:searchName' component={AuthIcon}/>
          <Route exact path='/test' component={NavigationBar}/>
          
        </Switch>
        
      


    </Router>
  )
}

export default App;

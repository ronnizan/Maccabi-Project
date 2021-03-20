import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import PopupMessage from './components/popup-message/PopupMessage';
import Navbar from './components/navbar/Navbar';
import { RegistrationPage, UsersPage } from './pages';

function App() {
  return (
    <Router>
      <Navbar />
      <PopupMessage />
      <Switch>
        <Route path='/register-user' exact component={RegistrationPage} exact />
        <Route path='/all-users' component={UsersPage} exact />
        <Redirect to='/register-user' />
      </Switch>
    </Router>
  );
}

export default App;

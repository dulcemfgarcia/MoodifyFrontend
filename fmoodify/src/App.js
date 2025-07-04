import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './views/landingPage';
import SignIn from './views/signIn';
import SignUp from './views/SignUp';
import Home from './views/Home';
import History from './views/History';
import Dashboard from './views/dashboard';
import ForgotPassword from './views/ForgotPassword';  
import RestorePassword from './views/RestorePassword';  

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/signIn" element={<SignIn/>} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/history" element={<History/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/forgotPassword" element={<ForgotPassword/>} />
        <Route path="/restorePassword" element={<RestorePassword/>} />
      </Routes>
    </>
  );
}

export default App;

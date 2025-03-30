import './App.css';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './views/landingPage';
import SignIn from './views/signIn';
import SignUp from './views/SignUp';
import Home from './views/home';
import History from './views/history';
import Dashboard from './views/dashboard';

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
        {/* <Route path="/contacts" element={user ? <Contacts user={user} setUser={setUser} /> : <LoginPage setUser={setUser} />} /> */}
      </Routes>
    </>
  );
}

export default App;

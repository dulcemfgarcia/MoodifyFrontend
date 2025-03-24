import {Link} from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';

export default function landingPage(){
    return (
        <div>
            <h1>LandingPage</h1>
            <Link to="/signIn">
                <button>Sign In</button>
            </Link>
            <Link to="/signUp">
                <button>Sign Up</button>
            </Link>
        </div>
    );
}
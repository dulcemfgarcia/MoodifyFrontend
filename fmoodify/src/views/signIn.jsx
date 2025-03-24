import { Link } from "react-router-dom";

export default function signIn() {
    return (
        <div>
            <h1>Sign In</h1>
            <Link to="/home">
                <button>Sign In</button>
            </Link>
        </div>
    );
}
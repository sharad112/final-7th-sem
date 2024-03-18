import { useState } from "react";
import './login.css';
import { NavLink, redirect } from 'react-router-dom';
import auth from '../../../../firebase/firebase';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch} from "react-redux";
import { setUserdata } from "../../../redux/user/userSlice";
function Login() {

    const [loading,setloading]=useState(false);
    const [data, setdata] = useState({
        name: "",
        number: "",

    });
    const fun = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        setdata((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })


    };
    auth.signOut();
    const dispatch=useDispatch();

    const [login, setlogin] = useState();
    // react hot toast 
    const notify = () => toast('Here is your toast.');
    // auth.signOut();
    const log_in=(logdata)=>
    {
        setloading(true)
        signInWithEmailAndPassword(auth,logdata.name,logdata.number).then((value)=>
        {
            const loggedin=value.user;
           
            console.log(loggedin,"log in success");
        }).catch((error)=>
        {
            console.error(error,"you cant perform this action");
        }).finally(()=>
        {
            setloading(false)
        })
    }
    const email_pass_auth = (authdata) => {
        createUserWithEmailAndPassword(auth, authdata.name, authdata.number).then((val) => {
            const user = val.user;
            console.log(user,"sign up success");
        }).catch((error) => {
            console.error(error, "authentication error");
            log_in(authdata)
        })

    }
    const submitted = (e) => {
        e.preventDefault();
        email_pass_auth(data);
    };
    auth.signOut();
    // const fun1 = () => {};
    return (
        <div className="App">
            <div className="form-wrapper">
                <div className="left">
                    <h1 className="login-head " >register below to continue</h1>
                    <div className="form">
                        <form onSubmit={submitted} className="form-content">
                            <input
                                type="text"
                                name="name"
                                id=""
                                placeholder="enter the name"
                                value={data.name}
                                onChange={fun}
                            />

                            <input
                                type="password"
                                name="number"
                                placeholder="enter your password"
                                id=""
                                value={data.number}
                                onChange={fun}
                            />


                            <button className="
                    submit" type="submit" >log in</button>
                            <div className="or">
                                <h1>or</h1>
                            </div>
                            <button className="google">continue with google</button>
                        </form>

                    </div>


                </div>
                <div className="signup">
                    <h1>don't have an account ? <span><NavLink to="/signup">sign up</NavLink></span></h1>
                </div>
            </div>
        </div>
    );
}

export default Login;

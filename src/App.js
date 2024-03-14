import "./App.css";
import Nav from "./comps/navigation/Nav";
import { Routes, Route, useNavigate} from "react-router-dom";
import Home from "./comps/router comp/Home/Home";
import History from "./comps/router comp/history/History";
import Setting from "./comps/router comp/setting/Setting";
import Login from "./comps/router comp/auth/Login/Login";
import auth from "./firebase/firebase";
import { store } from "./comps/redux/store/store";
import { Provider } from "react-redux";
import {useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { setUserdata } from "./comps/redux/user/userSlice";
import Form from "./comps/crops form/Form";
import Dashboard from "./comps/router comp/userdashboard/Dashboard";
import Result from "./comps/router comp/result/Result";

function App() {
  const [logdata,setlog]=useState();
  const dispatch=useDispatch();
logdata?console.log("access token",logdata.accessToken):console.log("no token");
  // redirecting to crop data 

  const navigate=useNavigate();
const handleredirect=(data)=>
{
  navigate(data);
}
  useEffect(()=>
  {
    onAuthStateChanged(auth,(user)=>
    {
      
      user?handleredirect("/result"):handleredirect("/login");
    })
  },[])
 
  dispatch(setUserdata("1","111222"));
  return (
    <Provider store={store}>
      <div className="App">
        <div className="top-nav">
          <Nav />
        </div>

        <div className="router">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/crops" element={<Form/>}/>
            <Route path="/result" element={<Result/>}/>
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;

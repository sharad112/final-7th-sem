
import './App.css';
import Nav from './comps/navigation/Nav';
import { Routes,Route } from 'react-router-dom';
import Home from './comps/router comp/Home/Home';
import History from './comps/router comp/history/History';
import Setting from './comps/router comp/setting/Setting';
import Login from './comps/router comp/auth/Login/Login';
import auth from './firebase/firebase';
function App() {
  console.log(auth);
  return (
    <div className="App">
      <div className="top-nav">
        <Nav />
      </div>

      <div className="router">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/history' element={<History/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

import { Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import auth from '../../firebase/firebase';

function PrivateRoute({ element, ...rest }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  if (user) {
    return <Route {...rest} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;

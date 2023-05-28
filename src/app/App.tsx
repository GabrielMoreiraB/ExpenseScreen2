import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TelaDespesas from "./TelaDespesas";
import { useEffect, useState } from "react";
import {IUser, getEventEndpoint} from './backend'
import LoginScreen from "./LoginScreen";

function App() {
  const [user, setUser] = useState<IUser | null>(null)

  useEffect(()=> {
    getEventEndpoint().then(setUser, signOut)
  }, []);

  function signOut(){
    setUser(null);
  }

  if(user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/despesas/:anoMes" element={<TelaDespesas user={user} onSignOut={signOut}/>} />
          <Route path="/" element={<Navigate to="/despesas/2021-01" />} />
        </Routes>
      </BrowserRouter>
    );
  } else {
    return <LoginScreen onSignIn={setUser}/>
  }
  
}

export default App;

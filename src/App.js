import React, { useState, useEffect, useContext } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./context/auth-context";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const ctx = useContext(AuthContext);
  // this would set an infinite loop
  // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  // if (storedUserLoggedInInformation === '1') {
  //   // setting state would re-render this component
  //   setIsLoggedIn(true);
  // }

  // moved to auth-context.js
  // useEffect(() => {
  //   const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
  //   if (storedUserLoggedInInformation === "1") {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem("isLoggedIn", "1");
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  return (
    <React.Fragment>
      {/* <AuthContext.Provider
        value={{
          // isLoggedIn: false,
          isLoggedIn: isLoggedIn,
          onLogout: logoutHandler
        }}
      > */}
      {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={ctx.logoutHandler} /> */}
      <MainHeader />
      <main>
        {/* {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />} */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;

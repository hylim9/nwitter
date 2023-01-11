import { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); //check if user logged in or not
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setIsLoggedIn(true);
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
    // setUserObj(Object.assign({}, user));
  };
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000);
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
      {/* <footer>&copy; {new Date().getFullYear()} Nwitter</footer> */}
    </>
  );
}

export default App;

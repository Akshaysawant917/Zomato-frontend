// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';


function App() {
 
  const[ user, setUser ] = useState({});

  function handleCallbackResponse(response){
    console.log("Encrypted JWT ID token:", response.credential);
    var userObject = jwtDecode(response.credential);
    console.log(userObject);
    setUser(userObject);
    sessionStorage.setItem("username",userObject.name);
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(){
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  function handleSignIn(){
    window.google.accounts.id.prompt();
  }

  useEffect(()=>{
    //global google
    window.google.accounts.id.initialize({
      client_id: `${encodeURIComponent(process.env.REACT_APP_GOOGLE_ID)}`,
      callback: handleCallbackResponse
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

    window.google.accounts.id.prompt();
  }, []);

  //if we have user => sign in button
  //if we have no user => log out button
 
  return (
    <div className="App">
      
        <div id='signInDiv'></div>
        { Object.keys(user).length === 0 &&
          <button onClick={() => handleSignIn() }>Sign In</button>
        }
        { Object.keys(user).length !== 0 &&
           <button onClick={ () => handleSignOut() }>Sign out</button>
        }
        { user &&
          <div>
            <img src={user.picture} alt=''></img>
            <h3>{user.name}</h3>
         {/* <button> continue with{user.name}</button> */}
          </div>
        }
    </div>
  );
}

export default App;

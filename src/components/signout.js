import { Button } from "@mui/material";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const checkSignedIn = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      setIsLoggedIn(true);
    } catch (e) {
      setIsLoggedIn(false);
    }
  }

  const signOutAmplify = async () => {
    try {
      await Auth.signOut()
      alert("Signed out successfully")
      setIsLoggedIn(false)
    } catch (e) {
      console.log(e)
      alert('error, cant sign out')
    }
  }

  useEffect(() => {
    checkSignedIn()
  }, [])

  if(isLoggedIn) return (<>
    <Button color="inherit" variant="outlined" onClick={signOutAmplify}>Sign OUT</Button>
  </>) 
  else {
    return <Navigate to="/signin" />
  }

}

export default SignOut;
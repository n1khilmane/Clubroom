import React from "react";
import { Auth } from "aws-amplify";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component }) => {
  const [isAuthenticated, setLoggedIn] = React.useState(true);
  React.useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await Auth.currentAuthenticatedUser();
        if (user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (e) {
        setLoggedIn(false);
      }
    })();
  });

  if(isAuthenticated) {
    return component
  } else {
    return <Navigate to="/signin" />
  }

  // return (
  //   <Route
  //     element={(props) =>
  //       isAuthenticated ? (
  //         React.createElement(component)
  //       ) : (
  //         <Navigate to="/signin" replace/>
  //       )
  //     }
  //   />
  // );
};

export default ProtectedRoute;
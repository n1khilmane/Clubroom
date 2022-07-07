import React from "react";
import { useInput } from "./../utils/forms";
import { Auth } from "aws-amplify";
import"../assets/style.css"

import {
  Grid,
  Paper,
  TextField,
  styled,
  Button,
  CircularProgress,
  Container,
  Hidden,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ClubRoomTitle from "./clubRoomTitle";
import ClubroomAltLogo from "./clubRoomAltLogo";
import { position } from "styled-system";

const Field = styled(TextField)({
  margin: "10px 0",
});

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.signIn(email, password);
      alert("success");
      navigate("/rooms");
    } catch (error) {
      console.log(error);
      alert("error");
    }
    setLoading(false);
  };
  return (
    <Grid container style={{overflow: "hidden"}}>
      <Grid item md={8}>
        <Paper
          style={{
            background: "#EAE9E6",
            height: "100vh",
            position: "relative",
            zIndex: 0,
          }}
          square
        >
          <Grid class="parent-container" container sx={{ paddingTop: 35 }}>

            {/* <Grid item md={4}>
            </Grid> */}
            {/* <Grid item md={4}> */}
              <ClubRoomTitle />
              <form class="login-form" onSubmit={handleSubmit}>
                  {/* <Grid item md={2}></Grid> */}
                    {/* <Grid
                      container
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        paddingTop: 80,
                      }}
                    > */}
                      {/* <Field label={email=== "" ? "email": ""} {...bindEmail} type="text" inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }} InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}/> */}
                      <input {...bindEmail} class="custom-input" style={{
                        borderRadius: "15px",
                        background: "white",
                        padding: "0.8rem 0.5rem",
                        fontSize: "1.2rem",
                        border: "none"
                      }}
                      placeholder="email"></input>
                      <input type="password" {...bindPassword} class="custom-input" style={{
                        margin: "0.8em 0",
                        borderRadius: "15px",
                        background: "white",
                        padding: "0.8rem 0.5rem",
                        fontSize: "1.2rem",
                        border: "none"
                      }}
                      placeholder="password"></input>
                      {/* <Field
                        label={password=== "" ? "password": ""}
                        type="password"
                        {...bindPassword}
                        inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }}
                        InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}
                      /> */}
                      
                      {/* <Grid container> */}
                        {/* <Grid
                          item
                          md={6}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                          sx={{ p: 1 }}
                        > */}
                          {/* <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            disabled={loading}
                          >
                            {loading && (
                              <CircularProgress
                                size={20}
                                style={{ marginRight: 20 }}
                              />
                            )}
                            Login
                          </Button> */}
                          <div style={{
                            display: "flex",
                            justifyContent: "center"
                          }}>
                            <button
                              style={{
                              outline: "none",
                              background: "white",
                              border: "none",
                              borderRadius: "10px",
                              padding: "0.5rem 2rem",
                              fontSize: "1.2rem",
                              marginRight: "1rem",
                              color: "#3FD064",
                              fontWeight: "bold"
                            }}>login</button>
                             <button
                             onClick={() => {
                              navigate("/signup");
                            }}
                             style={{
                              outline: "none",
                              background: "transparent",
                              alignSelf: "stretch",
                              border: "none",
                              borderRadius: "10px",
                              padding: "0.5rem 2rem",
                              fontSize: "1.2rem",
                              backgroundColor: "#3FD064",
                              color: "white",
                              fontWeight: "bold"
                            }}>register</button>
                          </div>
                        {/* </Grid> */}
                        {/* <Grid
                          item
                          md={6}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                          sx={{ p: 1 }}
                        > */}
                          {/* <Button
                            variant="contained"
                            onClick={() => {
                              navigate("/signup");
                            }}
                          >
                            Register
                          </Button> */}
                        {/* </Grid> */}
                      {/* </Grid> */}
              </form>
            {/* </Grid> */}
            {/* <Grid item md={4}></Grid> */}
          </Grid>
        </Paper>
      </Grid>
      <Grid style={{
        position: "relative",
      }} item md={4}>
        <img style={{
          height: "70vh",
          position: "absolute",
          top: "50%",
          left: "-12rem",
          transform: "translateY(-50%)",
          zIndex: "1"
        }} 
        src="/Clubroom.png"></img>
        <img style={{
          scale: "80%",
          height: "70vh",
          position: "absolute",
          bottom: "-30%",
          left: "60%",
          transform: "translateX(-50%)",
          zIndex: "1"
        }} 
        src="/Globe.png"></img>
        <Paper
          style={{
            background: "#3FD064",
            height: "100vh",
            position: "relative",
            zIndex: 0,
          }}
          square
        ></Paper>
      </Grid>
    </Grid>
  );
};

export default Login;

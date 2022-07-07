import React from "react";
import { Grid, Paper, TextField, styled, Button, CircularProgress,  Container } from "@mui/material";
import { useInput } from "./../utils/forms";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";
import ClubRoomTitle from "./clubRoomTitle";

const Field = styled(TextField)({
  margin: "10px 0",
});

const DLink = styled(Link)({
  margin: "15px 0",
  textAlign: "right",
});

const Signup = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const { value: name, bind: bindName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert(
        "Error!! Password and Confirm Password should be same danger"
      );
      return;
    }
    try {
      await Auth.signUp({
        username: email,
        password: confirmPassword,
        attributes: {
          email,
          name
        },
      });
      alert("Success!! Signup was successful success");
      navigate("/confirmation");
    } catch (error) {
      console.error(error);
      alert("Error!! error.message danger");
    }
    setLoading(false);
  };


return (   
<Grid container>
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
    <Grid container sx={{ paddingTop: 35 }}>

      <Grid item md={4}>
      </Grid>
      <Grid item md={4}>
        <ClubRoomTitle />
        <form onSubmit={handleSignUp}>
          <Grid container>
            <Grid item md={2}></Grid>
            <Grid item md={8}>
              <Grid
                container
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingTop: 80,
                }}
              >
                <Field
                  label={name=== "" ? "name": ""}
                  type="name"
                  {...bindName}
                  inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }}
                  InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}
                />
                <Field label={email=== "" ? "email": ""} {...bindEmail} type="text" inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }} InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}/>
                <Field
                  label={password=== "" ? "password": ""}
                  type="password"
                  {...bindPassword}
                  inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }}
                  InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}
                />
                <Field
                  label={confirmPassword=== "" ? "confirm password": ""}
                  type="password"
                  {...bindConfirmPassword}
                  inputProps={{ style: {background: "white", borderRadius: 8, fontFamily: "Nunito Sans", fontSize: '1rem'} }}
                  InputLabelProps={{shrink: false, style:{fontFamily: "Nunito Sans", fontSize: '1rem'}}}
                />
                <Grid container>
                  <Grid
                    item
                    md={6}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    sx={{ p: 1 }}
                  >
                
                  </Grid>
                  <Grid
                    item
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    sx={{ p: 1 }}
                  >
                        <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                                disabled={loading}
                            >
                                {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                                Register
                            </Button>


                  </Grid>
                </Grid>
                <Grid item md={2}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <Grid item md={4}></Grid>
    </Grid>
  </Paper>
</Grid>
<Grid item md={4}>
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

export default Signup;
import React from "react";
import { TextField, styled, Button, CircularProgress } from "@mui/material";
import { useInput } from "./../utils/forms";
import { Auth } from "aws-amplify";
import { Link, useNavigate } from "react-router-dom";

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

  const { value: email, bind: bindEmail } = useInput("");
  const { value: code, bind: bindCode } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      alert("Success!! Verified Successfully success");
      navigate("/signin");
    } catch (error) {
      console.log(error)
      alert("Error!!");
    }
    setLoading(false);
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onSubmit={handleSubmit}
    >
      <h1 style={{ fontSize: "22px", fontWeight: 800 }}>
        {" "}
        Verify Your Account
      </h1>
      <Field label="Email" {...bindEmail} type="email" />
      <Field label="Verification Code" {...bindCode} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        disabled={loading}
      >
        {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
        Verify your account
      </Button>
      <DLink to="/signup">make an account &rarr;</DLink>
    </form>
  );
};

export default Signup;
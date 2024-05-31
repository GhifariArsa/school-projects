import React from "react";
import FormLogin from "../Components/Form/FormLogin";
import createUtilityClassName from "react-bootstrap/esm/createUtilityClasses";

function Login(props) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh"}} className="bg-darker">
        <FormLogin login={props.login} />
      </div>
    </>
  );
}

export default Login;

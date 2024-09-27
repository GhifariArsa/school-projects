import FormSignUp from "../Components/Form/FormSignUp";

function Signup(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
        className="bg-darker"
      >
        <FormSignUp login={props.login}/>
      </div>
    </>
  );
}

export default Signup;

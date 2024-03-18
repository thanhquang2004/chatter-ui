import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Auth from "./Auth";
import { useLogin } from "../../hooks/useLogin";

const Login = () => {
  const { login, error } = useLogin();

  return (
    <>
      <Auth
        submitLabels="Login"
        onSubmit={async (request) => {
          login(request);
        }}
        error={error}
      >
        <Link to={"/signup"} style={{ alignSelf: "center" }}>
          <MuiLink>Signup</MuiLink>
        </Link>
      </Auth>
    </>
  );
};

export default Login;

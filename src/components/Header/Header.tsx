import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Branding from "./Branding";
import MobileNavigation from "./mobile/MobileNav";
import MobileBranding from "./mobile/MoblieBranding";
import Navigation from "./Navigation";
import Setting from "./Setting";
import { useReactiveVar } from "@apollo/client";
import authenticatedVar from "../../constants/authenticated";
import { Page } from "../../interfaces/page.interface";
import UnAuthenticatedNavigation from "./UnauthentiacatedNavigation";

const pages: Page[] = [
  {
    title: "Home",
    path: "/",
  },
];

const unauthenticatiedPages: Page[] = [
  {
    title: "Login",
    path: "/login",
  },
  {
    title: "Signup",
    path: "/signup",
  },
];

const Header = () => {
  const authenticated = useReactiveVar(authenticatedVar);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Branding />
          {authenticated && <MobileNavigation pages={pages} />}
          <MobileBranding />
          {authenticated && <Navigation pages={pages} />}
          {authenticated && <Setting />}
          {!authenticated && <UnAuthenticatedNavigation pages={unauthenticatiedPages} />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;

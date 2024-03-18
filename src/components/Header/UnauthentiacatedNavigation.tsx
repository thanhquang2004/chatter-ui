import { Box, Button } from "@mui/material";
import { Page } from "../../interfaces/page.interface";
import router from "../Routes";

interface NavigationProps {
  pages: Page[];
}

const UnAuthenticatedNavigation = ({ pages }: NavigationProps) => {
  return (
    <Box sx={{ flexGrow: 0, display: "flex", marginLeft: "auto" }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          sx={{ my: 2, color: "white", display: "block" }}
          onClick={() => router.navigate(page.path)}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

export default UnAuthenticatedNavigation;

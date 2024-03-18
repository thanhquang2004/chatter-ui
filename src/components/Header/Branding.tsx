import { Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import router from "../Routes";
import { useGetMe } from "../../hooks/useGetMe";

const Branding = () => {
  const { data } = useGetMe();

  return (
    <>
      <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        onClick={() => {
          if (data) {
            router.navigate("/");
          } else {
            router.navigate("/login");
          }
        }}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          cursor: "pointer",
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        CHATTER
      </Typography>
    </>
  );
};

export default Branding;

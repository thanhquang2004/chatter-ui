import ForumIcon from "@mui/icons-material/Forum";
import { Typography } from "@mui/material";
import router from "../../Routes";
import { useGetMe } from "../../../hooks/useGetMe";

const MobileBranding = () => {
  const { data } = useGetMe();

  return (
    <>
      <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
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
          display: { xs: "flex", md: "none" },
          cursor: "pointer",
          flexGrow: 1,
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

export default MobileBranding;

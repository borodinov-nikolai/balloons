import { Backdrop, CircularProgress } from "@mui/material";

type LoaderProps = {
  show: boolean;
};

const Loader = () => {
  return (
    <Backdrop
      sx={{
        color: "#0070f3",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(255,255,255, .8)",
      }}
      open={true}
    >
      <CircularProgress color="inherit" size={100} />
    </Backdrop>
  );
};

export default Loader;

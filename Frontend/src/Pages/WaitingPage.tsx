import { CircularProgress } from "@mui/material";

type WaitingPageProps = {
  color: string;
};

const WaitingPage: React.FC<WaitingPageProps> = ({ color }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <CircularProgress sx={{ color: color }} />
    </div>
  );
};

export default WaitingPage;

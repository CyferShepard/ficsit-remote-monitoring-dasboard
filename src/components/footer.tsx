import { Box, Container, Divider, Grid, Typography } from "@mui/joy";
import { Link } from "react-router-dom";

export const Footer: React.FC = (props) => {
  return (
    <Box>
      <Container sx={{ paddingBottom: "40px" }}>
        <Divider sx={{ marginTop: "40px", marginBottom: "20px" }} />
        <Grid container>
          <Grid xs>
            <Typography level="body2">
              Created with lots of ☕ by{" "}
              <Link
                style={{ color: "var(--joy-palette-primary-main)", textDecoration: "none" }}
                target="_blank"
                to="https://github.com/Jonathan-Hofmann"
              >
                Jonathan
              </Link>{" "}
              and{" "}
              <Link
                style={{ color: "var(--joy-palette-primary-main)", textDecoration: "none" }}
                target="_blank"
                to="https://github.com/arfla"
              >
                Arfla
              </Link>
            </Typography>
            <Typography level="body2">
              This fork is maintained by{" "}
              <Link
                style={{ color: "var(--joy-palette-primary-main)", textDecoration: "none" }}
                target="_blank"
                to="https://github.com/CyferShepard"
              >
                CyferShepard
              </Link>
            </Typography>
          </Grid>
          <Grid xs>
            <Typography level="body1" marginBottom={"5px"} textAlign={"center"}>
              Ficsit Remote Monitoring Dashboard
            </Typography>
            <Typography level="body2" textAlign={"center"}>
              Github Repository{" "}
              <Link
                style={{ color: "var(--joy-palette-primary-main)", textDecoration: "none" }}
                target="_blank"
                to="https://github.com/CyferShepard/ficsit-remote-monitoring-dasboard"
              >
                here
              </Link>
            </Typography>
          </Grid>
          <Grid xs>
            <Typography textAlign={"right"} level="body2">
              Base Mod for Satisfactory:{" "}
              <Link
                style={{ color: "var(--joy-palette-primary-main)", textDecoration: "none" }}
                target="_blank"
                to="https://ficsit.app/mod/FicsitRemoteMonitoring"
              >
                Ficsit Remote Monitoring
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

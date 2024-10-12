import { Button, Card, CardContent, Container, Grid, Input, Option, Select, Typography } from "@mui/joy";
import React, { useContext } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { ConnectionCheckerContext } from "../context/connectionChecker";
import { useLocalStorage } from "../hooks/localStorage";

enum protocol {
  http = "http",
  https = "https",
}

export const defaultSettingsData = {
  protocol: protocol.http,
  ip: "localhost",
  port: "8080",
  interval: 1000,
};

export const Settings: React.FC = (props) => {
  const [settings, setSettings] = useLocalStorage("rmd_settings", defaultSettingsData);

  return (
    <Container>
      <Card variant="outlined" sx={{ marginTop: "40px", marginBottom: "30px" }}>
        <CardContent>
          <Grid container>
            <Grid xs>
              <Typography level="h3">Settings</Typography>
            </Grid>
            <Grid>
              {/* <Button onClick={()=>{}}>
                                Save Settings
                            </Button> */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Grid container spacing={2} sx={{ marginBottom: "30px" }}>
        <Grid xs={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="h5">Connection</Typography>

              <Select
                sx={{ marginTop: "15px" }}
                value={defaultSettingsData.protocol || settings.protocol}
                onChange={(e, v) => {
                  setSettings({ ...settings, ["protocol"]: v });
                }}
              >
                <Option value={protocol.http}>http</Option>
                <Option value={protocol.https}>https</Option>
              </Select>

              <Input
                sx={{ marginTop: "15px" }}
                value={settings.ip}
                onChange={(e) => {
                  setSettings({ ...settings, ["ip"]: e.target.value });
                }}
                startDecorator={`${settings.protocol || defaultSettingsData.protocol}://`}
                placeholder="127.0.0.1"
              />
              <Input
                sx={{ marginTop: "15px" }}
                value={settings.port.replace(":", "")}
                onChange={(e) => {
                  setSettings({ ...settings, ["port"]: e.target.value !== "" ? ":" + e.target.value : "" });
                }}
                startDecorator={
                  `${settings.protocol || defaultSettingsData.protocol}://` + settings.ip + (settings.port !== ":" ? ":" : "")
                }
                placeholder=""
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="h5">Data Interval Speed</Typography>

              <Select
                sx={{ marginTop: "15px" }}
                value={settings.interval}
                onChange={(e, v) => {
                  setSettings({ ...settings, ["interval"]: parseInt(v) });
                }}
              >
                <Option value={100}>100 ms (VERY fast)</Option>
                <Option value={250}>250 ms (very fast)</Option>
                <Option value={500}>500 ms (fast)</Option>
                <Option value={1000}>1 sek. (normal)</Option>
              </Select>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={3}>
          <Card variant="outlined">
            <CardContent>
              <Typography level="h5">Preferences</Typography>

              <Typography level="body2" marginTop={"15px"}>
                More preferences coming soon.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card variant="outlined">
        <CardContent>
          <Typography startDecorator={<BsExclamationCircle />} level="body3">
            All Changes have immidiate effect.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

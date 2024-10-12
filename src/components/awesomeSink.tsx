import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
  LinearProgress,
  Stack,
  Tooltip,
} from "@mui/joy";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { SettingsContext } from "../context/Settings";
import { factoryRefs } from "../constants/buildings";
import { itemRefs } from "../constants/items";
import PlotFigure from "../views/plotWrapper";
// @ts-ignore
import * as Plot from "@observablehq/plot";
import { Skeleton } from "@mui/material";
import { useLocalStorage } from "../hooks/localStorage";
import { defaultSettingsData } from "../views/settings";
// import { data } from "../constants/test-data";

export const AwesomeSink: React.FC = (props) => {
  const [doLoadData, setLoadData] = useState(true);
  const [sinks, setSink] = useState<undefined | any>(undefined);
  // const [sinks2, setSink2] = useState<undefined | any>(undefined);

  const [data, setData] = useState<undefined | any>(undefined);
  const [settings, _] = useLocalStorage("rmd_settings", defaultSettingsData);

  const loadData = async () => {
    if (doLoadData === true) {
      const response = await axios.get(`${settings.protocol}://` + settings.ip + settings.port + "/getResourceSink");
      // const response2 = await axios.get(`${settings.protocol}://` + settings.ip + settings.port + "/getExplorationSink");
      setSink(response.data);
      // setSink2(response.data);
      //console.log(response.data);

      setTimeout(() => {
        loadData();
      }, settings.interval);
    }
  };

  useEffect(() => {
    if (sinks) {
      const transformedData = sinks[0].GraphPoints.map((value: number, index: number) => ({ Index: index + 1, value }));
      setData(transformedData);
    }
  }, [sinks]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {sinks && data ? (
        <>
          <Card variant="outlined" sx={{ marginBottom: "20px" }}>
            <CardContent>
              <Box>
                <Stack>
                  <Grid container spacing={2} padding={0}>
                    <Grid xs>
                      <img
                        src={"./assets/" + factoryRefs["Awesome Sink"].image}
                        alt="image"
                        style={{ height: "70px", width: "70px" }}
                      ></img>
                      <Typography level="h6" marginY={"15px"}>
                        Awesome Sink
                      </Typography>
                    </Grid>
                    <Grid display={"flex"} alignItems={"flex-end"} flexDirection="column">
                      <Typography level="h4">
                        {new Intl.NumberFormat("de-DE", { style: "decimal" }).format(sinks[0].TotalPoints)}
                      </Typography>
                      <Typography level="body2">Total Points</Typography>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      "& svg": {
                        background: "transparent",
                      },
                      "& svg g text": {
                        fontSize: "0.9rem",
                        padding: "5px",
                        backgroundColor: "#000",
                      },
                      color: "white",
                      padding: "10px",
                    }}
                  >
                    <PlotFigure
                      options={{
                        // width: (dimensions.width-40),
                        height: 300,
                        inset: 40,
                        y: {
                          grid: true,
                          label: "Points per minute",
                        },
                        x: {
                          line: true,
                          label: "Last 10",
                        },
                        color: {
                          domain: [1, 0, -1], // Down - Equal - Up
                          range: ["#4daf4a", "#999999", "#e41a1c"], // Red - Gray - Green
                        },
                        marks: [
                          Plot.line(data, {
                            x: "Index",
                            y: "value",
                            stroke: "rgba(255,255,255,0.4)",
                            strokeWidth: 2,
                            // curve: "catmull-rom",
                            marker: "circle",
                            markerSize: 5,
                            // title: (d:any) => `AAPL \n High: ${d.High}` // \n makes a new line
                          }),

                          Plot.text(data, {
                            x: "Index",
                            y: "value",
                            text: (d: any) => `${new Intl.NumberFormat("de-DE", { style: "decimal" }).format(d.value)}`,
                            dy: 20,
                          }),
                        ],
                      }}
                    ></PlotFigure>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Grid container padding={0}>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h5">
                    {new Intl.NumberFormat("de-DE", { style: "decimal" }).format(sinks[0].PointsToCoupon)}
                  </Typography>
                  <Typography level="body2">Next Coupon in</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h5">
                    {new Intl.NumberFormat("de-DE", { style: "decimal" }).format(sinks[0].Percent)} %
                  </Typography>
                  <Typography level="body2">Next Coupon (%)</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography level="h5">
                    {new Intl.NumberFormat("de-DE", { style: "decimal" }).format(sinks[0].NumCoupon)}
                  </Typography>
                  <Typography level="body2">Total Coupon(s)</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Card variant="outlined" sx={{ marginBottom: "20px", opacity: 0.5 }}>
            <CardContent>
              <Box>
                <Stack>
                  <Grid container spacing={2} padding={0} sx={{ marginBottom: "20px" }}>
                    <Grid xs>
                      <Skeleton variant="circular" sx={{}} width={"70px"} height={"70px"}></Skeleton>

                      <Skeleton
                        variant="rounded"
                        sx={{ marginTop: "20px", marginBottom: "10px" }}
                        width={"120px"}
                        height={"20px"}
                      ></Skeleton>
                    </Grid>
                    <Grid display={"flex"} alignItems={"flex-end"} flexDirection="column">
                      <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} width={"80px"} height={"40px"}></Skeleton>
                      <Skeleton sx={{ marginBottom: "10px" }} width={"120px"}></Skeleton>
                    </Grid>
                  </Grid>

                  <Skeleton variant="rounded" sx={{ width: "100%" }} height={"140px"}></Skeleton>
                </Stack>
              </Box>
            </CardContent>
          </Card>

          <Grid container padding={0} sx={{ opacity: 0.5 }}>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} width={"80px"} height={"40px"}></Skeleton>
                  <Skeleton width={"120px"}></Skeleton>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} width={"80px"} height={"40px"}></Skeleton>
                  <Skeleton width={"120px"}></Skeleton>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card variant="outlined">
                <CardContent>
                  <Skeleton variant="rounded" sx={{ marginBottom: "10px" }} width={"80px"} height={"40px"}></Skeleton>
                  <Skeleton width={"120px"}></Skeleton>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

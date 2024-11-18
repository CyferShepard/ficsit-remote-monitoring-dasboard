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
import { BsExclamationCircle, BsX, BsArrowRightShort, BsXCircle, BsQuestionCircle } from "react-icons/bs";
import axios from "axios";
import { SettingsContext } from "../context/Settings";

import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useLocalStorage } from "../hooks/localStorage";
import { defaultSettingsData } from "./settings";
import { Vehicle } from "../components/vehicles/vehicle";

export const Vehicles: React.FC = (props) => {
  const [doLoadData, setLoadData] = useState(true);
  const [vehicles, setVehicles] = useState<undefined | any>(undefined);
  const [settings, _] = useLocalStorage("rmd_settings", defaultSettingsData);

  const loadData = async () => {
    if (doLoadData === true) {
      const response = await axios.get(`${settings.protocol}://` + settings.ip + settings.port + "/getVehicles");
      const vehiclesWithFuelType = response.data.map((vehicle: any) => ({
        ...vehicle,
        FuelType: vehicle.FuelInventory?.[0]?.Name ?? "N/A", // or any default value you want to set
      }));
      setVehicles(vehiclesWithFuelType);
      // console.log(vehiclesWithFuelType);

      setTimeout(() => {
        loadData();
      }, settings.interval);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Card variant="outlined" sx={{ paddingBottom: "0px", marginBottom: "30px" }}>
        <CardContent>
          <Grid container display={"flex"} alignItems={"center"} marginBottom={"20px"}>
            <Grid xs>
              <Typography level="h2" fontWeight={600}>
                All Vehicles
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {vehicles ? (
        <>
          <Grid container spacing={3} sx={{ marginBottomY: "30px" }} display={"flex"} alignItems={"center"}>
            {vehicles.map((vehicle: any, index: number) => {
              return (
                <Grid xs={3} key={index}>
                  <a href={"#" + index} style={{ textDecoration: "none" }}>
                    <Card
                      variant="outlined"
                      sx={{
                        position: "relative",
                        paddingY: 0,
                        "&:hover": {
                          borderColor: "var(--joy-palette-neutral-700)",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={4} sx={{ paddingX: 0 }}>
                          <Grid>
                            {vehicle.Name === "Explorer" && (
                              <img
                                src="./assets/Vehicles/Explorer_256.png"
                                alt="Explorer_256"
                                style={{ height: "70px", width: "70px" }}
                              ></img>
                            )}
                            {vehicle.Name === "Truck" && (
                              <img
                                src="./assets/Vehicles/Truck_256.png"
                                alt="Truck_256"
                                style={{ height: "70px", width: "70px" }}
                              ></img>
                            )}
                            {vehicle.Name === "Tractor" && (
                              <img
                                src="./assets/Vehicles/Tractor_256.png"
                                alt="Tractor_256"
                                style={{ height: "70px", width: "70px" }}
                              ></img>
                            )}
                          </Grid>

                          <Grid xs>
                            <Box sx={{ marginBottom: "10px" }}>
                              {vehicle.Autopilot === false ? (
                                <Chip
                                  color="primary"
                                  size="sm"
                                  variant="outlined"
                                  sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)", borderColor: "rgba(255, 255, 255, 0.1)" }}
                                >
                                  Manual
                                </Chip>
                              ) : (
                                <Chip
                                  color="neutral"
                                  size="sm"
                                  variant="outlined"
                                  sx={{ backgroundColor: "rgba(47, 128, 237, 0.1)", borderColor: "rgba(47, 128, 237, 0.1)" }}
                                >
                                  Autopilot
                                </Chip>
                              )}
                            </Box>
                            <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                              Speed: {parseInt(vehicle.ForwardSpeed)} km/h
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </a>
                </Grid>
              );
            })}
          </Grid>

          {/* Show all vehicles that are in manual drive mode */}
          <Typography level="h2" fontWeight={600} marginTop={"40px"} marginBottom={"20px"}>
            Manual Vehicles
          </Typography>

          <Grid container spacing={3} sx={{ marginBottomY: "30px" }} display={"flex"} alignItems={"center"}>
            {vehicles
              .filter((vehicle: any) => vehicle.Autopilot === false)
              .map((vehicle: any, index: number) => {
                return <Vehicle key={index} vehicle={vehicle} index={index} />;
              })}
          </Grid>
          {/* Show all vehicles that are in autopilot */}
          <Typography level="h2" fontWeight={600} marginTop={"40px"} marginBottom={"20px"}>
            Autopiloted Vehicles
          </Typography>
          <Grid container spacing={3}>
            {vehicles
              .filter((vehicle: any) => vehicle.Autopilot === true)
              .map((vehicle: any, index: number) => {
                console.log(vehicle);
                return <Vehicle key={index} vehicle={vehicle} index={index} />;
              })}
          </Grid>
        </>
      ) : (
        <>
          <Grid container spacing={3} sx={{ marginBottomY: "30px", opacity: 0.5 }} display={"flex"} alignItems={"center"}>
            <Grid xs={3}>
              <Card variant="outlined" sx={{}}>
                <CardContent>
                  <Grid container spacing={4} sx={{ paddingX: 0 }}>
                    <Grid>
                      <Skeleton variant="circular" height="50px" width="50px" />
                    </Grid>

                    <Grid xs>
                      <Box sx={{ marginBottom: "10px" }}>
                        <Skeleton variant="rounded" height="20px" width="70px" />
                      </Box>
                      {/* <Typography sx={{color: 'rgba(255,255,255,0.9)'}}>Speed: {parseInt(vehicle.ForwardSpeed)} km/h</Typography> */}
                      <Skeleton width="50px" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={3}>
              <Card variant="outlined" sx={{}}>
                <CardContent>
                  <Grid container spacing={4} sx={{ paddingX: 0 }}>
                    <Grid>
                      <Skeleton variant="circular" height="50px" width="50px" />
                    </Grid>

                    <Grid xs>
                      <Box sx={{ marginBottom: "10px" }}>
                        <Skeleton variant="rounded" height="20px" width="70px" />
                      </Box>
                      {/* <Typography sx={{color: 'rgba(255,255,255,0.9)'}}>Speed: {parseInt(vehicle.ForwardSpeed)} km/h</Typography> */}
                      <Skeleton width="50px" />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography level="h2" fontWeight={600} marginTop={"40px"} marginBottom={"20px"}>
            Manual Vehicles
          </Typography>

          <Grid container spacing={3} sx={{ marginBottomY: "30px", opacity: 0.5 }} display={"flex"} alignItems={"center"}>
            <Grid xs={4}>
              <Card sx={{ position: "relative", paddingBottom: 0 }} variant="outlined">
                <CardContent>
                  <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <Skeleton variant="circular" height="100px" width="100px" />
                    <Box sx={{ position: "relative" }}>
                      <Grid container spacing={1} display={"flex"} alignItems={"center"}>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="70px" />
                        </Grid>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="90px" />
                        </Grid>
                      </Grid>
                    </Box>
                    <Skeleton width="50px" />
                  </Stack>

                  <Grid container spacing={2} sx={{ paddingX: 0 }}>
                    <Grid xs>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Speed</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="120px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Gear</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="100px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Engine RPM</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="80px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Inventory</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="110px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Type</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="50px" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={4}>
              <Card sx={{ position: "relative", paddingBottom: 0 }} variant="outlined">
                <CardContent>
                  <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <Skeleton variant="circular" height="100px" width="100px" />
                    <Box sx={{ position: "relative" }}>
                      <Grid container spacing={1} display={"flex"} alignItems={"center"}>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="70px" />
                        </Grid>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="90px" />
                        </Grid>
                      </Grid>
                    </Box>
                    <Skeleton width="50px" />
                  </Stack>

                  <Grid container spacing={2} sx={{ paddingX: 0 }}>
                    <Grid xs>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Speed</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="120px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Gear</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="100px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Engine RPM</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="80px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Inventory</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="110px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Type</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="50px" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Typography level="h2" fontWeight={600} marginTop={"40px"} marginBottom={"20px"}>
            Autopiloted Vehicles
          </Typography>

          <Grid container spacing={3} sx={{ marginBottomY: "30px", opacity: 0.5 }} display={"flex"} alignItems={"center"}>
            <Grid xs={4}>
              <Card sx={{ position: "relative", paddingBottom: 0 }} variant="outlined">
                <CardContent>
                  <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
                    <Skeleton variant="circular" height="100px" width="100px" />
                    <Box sx={{ position: "relative" }}>
                      <Grid container spacing={1} display={"flex"} alignItems={"center"}>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="70px" />
                        </Grid>
                        <Grid>
                          <Skeleton variant="rounded" height="20px" width="90px" />
                        </Grid>
                      </Grid>
                    </Box>
                    <Skeleton width="50px" />
                  </Stack>

                  <Grid container spacing={2} sx={{ paddingX: 0 }}>
                    <Grid xs>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Speed</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="120px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Gear</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="100px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Engine RPM</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="80px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Inventory</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="110px" />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid xs>
                          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Type</Typography>
                        </Grid>
                        <Grid>
                          <Skeleton width="50px" />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

import { Box, Card, CardContent, Chip, Grid, Typography, Stack } from "@mui/joy";
import React, { useState } from "react";
import { BsXCircle } from "react-icons/bs";

interface VehicleProps {
  vehicle: any;
  index: number;
}

export const Vehicle: React.FC<VehicleProps> = (props) => {
  const [vehicle, setVehicles] = useState<undefined | any>(props.vehicle);
  const [index, setIndex] = useState<undefined | any>(props.index);

  return (
    <Grid xs={4}>
      <div id={index.toString()}></div>
      <Card sx={{ position: "relative", paddingBottom: 0 }} variant="outlined">
        <CardContent>
          <Stack display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
            {vehicle.VehicleType === "Explorer" && (
              <img src="./assets/Vehicles/Explorer_256.png" alt="image" style={{ height: "100px", width: "100px" }}></img>
            )}
            {vehicle.VehicleType === "Truck" && (
              <img src="./assets/Vehicles/Truck_256.png" alt="image" style={{ height: "100px", width: "100px" }}></img>
            )}
            {vehicle.VehicleType === "Tractor" && (
              <img src="./assets/Vehicles/Tractor_256.png" alt="image" style={{ height: "100px", width: "100px" }}></img>
            )}
            <Box sx={{ position: "relative" }}>
              <Grid container spacing={1} display={"flex"} alignItems={"center"}>
                <Grid>
                  {vehicle.Airborne === false ? (
                    <Chip
                      color="success"
                      size="sm"
                      variant="outlined"
                      sx={{ backgroundColor: "rgba(33, 150, 83, 0.1)", borderColor: "rgba(33, 150, 83, 0.1)" }}
                    >
                      No Problems
                    </Chip>
                  ) : (
                    <Chip
                      color="danger"
                      size="sm"
                      variant="outlined"
                      sx={{ backgroundColor: "rgba(235, 87, 87, 0.12)", borderColor: "rgba(235, 87, 87, 0.12)" }}
                    >
                      Airborne
                    </Chip>
                  )}
                </Grid>
                <Grid>
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
                </Grid>
              </Grid>
            </Box>
            <Typography marginLeft={"5px"} level="body2">
              VehicleID: #{vehicle.ID}
            </Typography>
          </Stack>

          <Grid container spacing={2} sx={{ paddingX: 0 }}>
            <Grid xs>
              <Grid container>
                <Grid xs>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Speed</Typography>
                </Grid>
                <Grid>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>{parseInt(vehicle.ForwardSpeed)} km/h</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Gear</Typography>
                </Grid>
                <Grid>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>{parseInt(vehicle.CurrentGear)}</Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid xs>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Engine RPM</Typography>
                </Grid>
                <Grid>
                  <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>{parseInt(vehicle.EngineRPM)} RPM</Typography>
                </Grid>
              </Grid>
              {/* <Grid container>
        <Grid xs>
          <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Inventory</Typography>
        </Grid>
        <Grid>
          <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>{parseInt(vehicle.FuelInventory)}</Typography>
        </Grid>
      </Grid> */}
              <Grid container>
                <Grid xs>
                  <Typography sx={{ color: "rgba(255,255,255,0.5)" }}>Fuel Type</Typography>
                </Grid>
                <Grid>
                  {vehicle.FuelType === "Alien Carapace" && (
                    <img
                      src="./assets/Items/IconDesc_AlienCarapace_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Alien Organs" && (
                    <img
                      src="./assets/Items/IconDesc_AlienOrgans_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Battery" && (
                    <img
                      src="./assets/Items/IconDesc_Battery_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Biomass" && (
                    <img
                      src="./assets/Items/IconDesc_Biomass_Final_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Coal" && (
                    <img
                      src="./assets/Items/IconDesc_CoalOre_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Color Cartridge" && (
                    <img
                      src="./assets/Items/IconDesc_ColorCartridge_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Compacted Coal" && (
                    <img
                      src="./assets/Items/IconDesc_CompactedCoal_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Fabric" && (
                    <img src="./assets/Items/IconDesc_Fabric_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "Flower Petals" && (
                    <img
                      src="./assets/Items/FlowerPetals_Final_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Fuel" && (
                    <img
                      src="./assets/Items/IconDesc_LiquidFuel_Pipe_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Leaves" && (
                    <img src="./assets/Items/IconDesc_Leaves_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "Liquid Biofuel" && (
                    <img
                      src="./assets/Items/IconDesc_LiquidBiofuel_Pipe_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Mycelia" && (
                    <img
                      src="./assets/Items/IconDesc_Mycelia_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Packaged Fuel" && (
                    <img src="./assets/Items/IconDesc_Fuel_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "Packaged Heavy Oil Residue" && (
                    <img src="./assets/Items/OilResidue_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "Packaged Liquid Biofuel" && (
                    <img
                      src="./assets/Items/IconDesc_LiquidBiofuel_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Packaged Oil" && (
                    <img src="./assets/Items/Oil_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "Packaged Turbofuel" && (
                    <img
                      src="./assets/Items/IconDesc_TurboFuel_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Petroleum Coke" && (
                    <img
                      src="./assets/Items/IconDesc_PetroleumCoke_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Plutonium Fuel Rod" && (
                    <img
                      src="./assets/Items/IconDesc_PlutoniumFuelRod_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Solid Biofuel" && (
                    <img
                      src="./assets/Items/IconDesc_SolidBiofuel_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Turbofuel" && (
                    <img
                      src="./assets/Items/IconDesc_LiquidTurboFuel_Pipe_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Uranium Fuel Rod" && (
                    <img
                      src="./assets/Items/IconDesc_NuclearFuelRod_256.png"
                      alt="image"
                      style={{ height: "30px", width: "30px" }}
                    ></img>
                  )}
                  {vehicle.FuelType === "Wood" && (
                    <img src="./assets/Items/IconDesc_Wood_256.png" alt="image" style={{ height: "30px", width: "30px" }}></img>
                  )}
                  {vehicle.FuelType === "N/A" && <BsXCircle color="red" size={"25px"} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <LinearProgress color="info" variant="determinate" value={percentDone} sx={{position: 'absolute', bottom: '0px', left: '0px', right: '0px'}} /> */}
        </CardContent>
      </Card>
    </Grid>
  );
};

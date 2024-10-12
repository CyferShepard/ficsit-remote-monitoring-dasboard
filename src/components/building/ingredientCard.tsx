import { Card, CardContent, Grid, Typography } from "@mui/joy";
import React from "react";

export const IngredientCard: React.FC<{ product: any; itemRefs: any }> = (props) => {
  return (
    <Card
      variant="outlined"
      sx={{
        padding: "3px",
        borderColor:
          Math.floor(props.product.Inventory) === 0
            ? "var(--joy-palette-error-main)"
            : "var(--joy-palette-neutral-outlinedBorder)",
        borderWidth: Math.floor(props.product.Inventory) === 0 ? "3px" : "1px",
      }}
    >
      <CardContent>
        <Grid spacing={2} container>
          <Grid>
            <img
              src={"/assets/" + props.itemRefs[props.product.Name]?.image ?? null}
              alt={props.product.Name}
              style={{ height: "30px", width: "30px" }}
            ></img>
          </Grid>
          <Grid xs>
            <Grid spacing={0} container sx={{ paddingTop: 0 }}>
              <Grid xs>
                <Typography level="body2">Current Consume</Typography>
              </Grid>
              <Grid>{props.product.CurrentConsumed.toFixed(2)}</Grid>
            </Grid>
            <Grid spacing={0} container sx={{ paddingTop: 0 }}>
              <Grid xs>
                <Typography level="body2">Max. Consume</Typography>
              </Grid>
              <Grid>{props.product.MaxConsumed.toFixed(2)}</Grid>
            </Grid>
            <Grid spacing={0} container sx={{ paddingTop: 0 }}>
              <Grid xs>
                <Typography level="body2">Efficency Consume</Typography>
              </Grid>
              <Grid>{Math.floor(props.product.ConsPercent.toFixed(2))} %</Grid>
            </Grid>
            <Grid
              spacing={0}
              container
              sx={{
                color:
                  Math.floor(props.product.Inventory) === 0 ? "var(--joy-palette-error-main)" : "var(--joy-palette-text-main)",
                paddingY: 0,
              }}
            >
              <Grid xs>
                <Typography level="body2">Input Inventory</Typography>
              </Grid>
              <Grid>{props.product.Inventory}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

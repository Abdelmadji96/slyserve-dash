import { Grid, TextField } from "@material-ui/core";
import React from "react";

export default function Tarifs({ tarifNumber }) {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            variant="outlined"
            color="primary"
            label={"Intitulé tarif " + tarifNumber}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            variant="outlined"
            color="primary"
            label={"Tarif " + tarifNumber}
            required
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
}

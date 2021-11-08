import { Grid, Paper, Typography } from "@mui/material";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { combineLatest } from "rxjs";
import { useObservable } from "../hooks/use_observable";
import { currentProject$, projects$ } from "../store/contents";
import { map } from "rxjs/operators";
import { useEffect } from "preact/hooks";

export const Content = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project] = useObservable(() =>
    combineLatest(projects$, currentProject$).pipe(
      map(([projects, currentProject]) => projects.get(currentProject))
    )
  );
  console.log(params);
  return (
    <Grid item xs={9}>
      <Paper elevation={2} sx={{ padding: 2, textAlign: "justify" }}>
        <Typography>
          <Outlet />
        </Typography>
      </Paper>
    </Grid>
  );
};

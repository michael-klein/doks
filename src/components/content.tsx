import { Grid, Paper, Typography } from "@mui/material";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { combineLatest } from "rxjs";
import { contents$, projects$ } from "../store/contents";
import { map } from "rxjs/operators";
import { useEffect } from "preact/hooks";
import { useParamsObservable } from "../hooks/use_params_observable";
import { useObservable, useObservableState } from "observable-hooks";
import { documents$ } from "../store/documents";
import { htmdx } from "htmdx";
import { h } from "preact";

export const Content = () => {
  const params = useParams();
  const document = useObservableState(
    useObservable(
      (input$) => {
        return combineLatest(input$, documents$).pipe(
          map(([input, documents]) => {
            return documents.get(input[0].contentSlug);
          })
        );
      },
      [params]
    )
  );
  console.log("document", document);
  return (
    <Grid item xs={9}>
      <Paper elevation={2} sx={{ padding: 2, textAlign: "justify" }}>
        <Typography>{htmdx(document.mdx, h, {})}</Typography>
      </Paper>
    </Grid>
  );
};

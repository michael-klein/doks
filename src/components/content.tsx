import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/system/styled";
import { useObservable, useObservableState } from "observable-hooks";
import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { documents$, modifyDocument } from "../store/documents";
import { MarkdownRenderer } from "./markdown_renderer";
const ContentWrapper = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    flexBasis: "initial",
  },
}));
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
  const toggleFav = useCallback(() => {
    modifyDocument({ ...document, isFavourite: !document.isFavourite });
  }, [document]);
  return (
    <ContentWrapper item xs={9}>
      <Card
        elevation={2}
        sx={{ padding: 2, textAlign: "justify", overflowX: "auto" }}
      >
        {document && (
          <CardHeader
            action={
              <IconButton aria-label="favourite" onClick={toggleFav}>
                <FavoriteIcon sx={{ color: document.isFavourite && "red" }} />
              </IconButton>
            }
            title={document.name}
            subheader={document.lastModified}
          />
        )}
        <CardContent sx={{ display: "block", overflow: "auto" }}>
          <MarkdownRenderer mdx={document?.mdx}></MarkdownRenderer>
        </CardContent>
      </Card>
    </ContentWrapper>
  );
};
export default Content;

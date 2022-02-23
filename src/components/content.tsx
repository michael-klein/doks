import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/system/styled";
import { useObservable, useObservableState } from "observable-hooks";
import { useCallback, useLayoutEffect, useRef } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { documents$, modifyDocument } from "../store/documents";
import { formatDate } from "../utils/format_date";
import { useParams } from "react-router-dom";
import { useComponentContext } from "../hooks/use_component_context";
const ContentWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "row",
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

  const contentRef = useRef<HTMLDivElement>();
  const onAfterRender = useCallback(() => {
    if (params.headingIndex !== undefined) {
      const element = contentRef.current?.querySelector(
        `#heading-${params.headingIndex}`
      );
      if (element) {
        const offset = 60;
        const bodyRect = window.document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        console.log(offsetPosition);
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  }, [params.headingIndex]);
  const { TableOfContents, MarkdownRenderer } = useComponentContext();
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
            subheader={formatDate(document.lastModified)}
          />
        )}
        <CardContent
          ref={contentRef}
          sx={{ display: "block", overflow: "auto" }}
        >
          <MarkdownRenderer
            mdx={document?.mdx}
            onAfterRender={onAfterRender}
          ></MarkdownRenderer>
        </CardContent>
      </Card>
      {document?.mdx?.includes("#") && (
        <Card
          elevation={2}
          sx={{
            padding: 2,
            textAlign: "justify",
            overflowX: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "-10px",
            whiteSpace: "pre",
            overflow: "visible",
            position: "sticky",
            top: "80px",
          }}
        >
          <TableOfContents mdx={document?.mdx}></TableOfContents>
        </Card>
      )}
    </ContentWrapper>
  );
};
export default Content;

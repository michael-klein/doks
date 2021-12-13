import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/system/styled";
import { useObservable, useObservableState } from "observable-hooks";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { documents$, modifyDocument } from "../store/documents";
import { formatDate } from "../utils/format_date";
import { MarkdownRenderer } from "./markdown_renderer";
import { TableOfContents } from "./table_of_contents";
import { useParams } from "react-router-dom";
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
  const scrollTimeOutRef = useRef<NodeJS.Timeout>();
  const onAfterRender = useCallback(() => {
    if (params.headingIndex !== undefined) {
      const element = contentRef.current?.querySelector(
        `#heading-${params.headingIndex}`
      );
      if (element) {
        clearTimeout(scrollTimeOutRef.current);
        scrollTimeOutRef.current = setInterval(() => {
          requestAnimationFrame(() => {
            const offset = 60;
            const bodyRect = window.document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;
            if (offsetPosition > 0) {
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
              clearTimeout(scrollTimeOutRef.current);
            }
          });
        }, 100);
      }
    }
  }, [params.headingIndex]);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      clearTimeout(scrollTimeOutRef.current);
    };
  }, [params.contentSlug]);

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
      {(document?.mdx?.match(/#/g) || []).length > 1 && (
        <Card
          elevation={2}
          sx={{
            textAlign: "justify",
            overflowX: "auto",
            marginTop: "20px",
            marginBottom: "20px",
            marginLeft: "-10px",
            overflow: "visible",
            position: "sticky",
            padding: "10px",
            paddingRight: 0,
            top: "100px",
          }}
        >
          <TableOfContents mdx={document?.mdx}></TableOfContents>
        </Card>
      )}
    </ContentWrapper>
  );
};
export default Content;

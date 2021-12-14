import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import styled from "@mui/system/styled";
import { useObservable, useObservableState } from "observable-hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { documents$, modifyDocument } from "../store/documents";
import { formatDate } from "../utils/format_date";
import { MarkdownRenderer } from "./markdown_renderer";
import { TableOfContents } from "./table_of_contents";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { InputAdornment } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { ConditionalCard } from "./conditional_card";
import * as clipboard from "clipboard-polyfill/text";

const ContentWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  alignItems: "start",
  flexDirection: "row",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    flexBasis: "initial",
  },
}));

const EmbedField = styled(TextField)(({ theme }) => ({
  cursor: "grab !important",
  "*": {
    cursor: "grab !important",
  },
  ".MuiOutlinedInput-root": {
    paddingRight: "10px",
  },
  input: {
    padding: "5px",
    paddingLeft: "14px",
    paddingRight: "14px",
    fontSize: ".9em",
  },
  svg: {
    height: "0.8em",
    width: "0.8em",
  },
}));

export const Content = ({ embed }: { embed?: boolean }) => {
  const params = useParams();
  const document = useObservableState(
    useObservable(
      (input$) => {
        return combineLatest([input$, documents$]).pipe(
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

  const [openSuccess, setOpenSuccess] = useState(false);

  return (
    <ContentWrapper item xs={embed ? false : 9}>
      <Snackbar
        sx={{ marginTop: "60px" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSuccess}
        autoHideDuration={6000}
        onClose={() => {
          setOpenSuccess(false);
        }}
      >
        <Alert
          sx={{ boxShadow: 1 }}
          severity="success"
          onClose={() => {
            setOpenSuccess(false);
          }}
        >
          Embed code copied to clipboard!
        </Alert>
      </Snackbar>
      <ConditionalCard
        showCard={!embed}
        elevation={2}
        sx={{
          padding: embed ? 1 : 2,
          textAlign: "justify",
          overflowX: "auto",
          flex: "auto",
          minHeight: "50vh",
          position: "relative",
        }}
      >
        {!embed && document && (
          <CardHeader
            action={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <FormControl
                  variant="standard"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                  onMouseUp={() => {
                    clipboard
                      .writeText(
                        `<iframe src="${window.location.href.replace(
                          "/#/docs",
                          "/#/embed"
                        )}" title="Talkwalker docs: ${document.name}"></iframe>`
                      )
                      .then(
                        () => {
                          setOpenSuccess(true);
                        },
                        () => {}
                      );
                  }}
                >
                  <EmbedField
                    id="component-simple"
                    value={`<iframe src="${window.location.href.replace(
                      "/#/docs",
                      "/#/embed"
                    )}" title="Talkwalker docs: ${document.name}"></iframe>`}
                    onChange={(e) => {
                      e.preventDefault();
                    }}
                    onFocus={(e) => {
                      e.preventDefault();
                    }}
                    variant={undefined}
                    label="embed"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ContentCopyIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
                <IconButton aria-label="favourite" onClick={toggleFav}>
                  <FavoriteIcon sx={{ color: document.isFavourite && "red" }} />
                </IconButton>
              </Box>
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
            embed={embed}
            onAfterRender={onAfterRender}
          ></MarkdownRenderer>
        </CardContent>
      </ConditionalCard>
      {!embed && (document?.mdx?.match(/#/g) || []).length > 1 && (
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
            display: { sm: "none", md: "flex" },
          }}
        >
          <TableOfContents mdx={document?.mdx}></TableOfContents>
        </Card>
      )}
    </ContentWrapper>
  );
};
export default Content;

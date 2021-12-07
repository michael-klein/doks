import {
  Autocomplete,
  autocompleteClasses,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/system";
import {
  useLayoutObservableState,
  useObservable,
  useObservableState,
} from "observable-hooks";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate, useParams } from "react-router";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  map,
  startWith,
  throttleTime,
} from "rxjs";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import { searchDocuments } from "../utils/search";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 900,
  minHeight: "60vh",
  maxHeight: "80vh",
  padding: 2,
  ["& > div"]: {
    bgcolor: "background.paper",
    border: "2px solid background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 2,
  },
};

interface PopperComponentProps {
  anchorEl?: any;
  disablePortal?: boolean;
  open: boolean;
}

const StyledAutocompletePopper = styled("div")(({ theme }) => ({
  [`& .${autocompleteClasses.paper}`]: {
    boxShadow: "none",
    margin: 0,
    color: "inherit",
    fontSize: 13,
    overflow: "visible",
  },
  [`& .${autocompleteClasses.listbox}`]: {
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    padding: 0,
    maxHeight: "70vh",
    [`& .${autocompleteClasses.option}`]: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      borderBottom: `1px solid  ${
        theme.palette.mode === "light" ? " #eaecef" : "#30363d"
      }`,
      border: "2px solid " + theme.palette.primary.light,
      borderRadius: "4px",
      marginTop: "5px",
      marginBottom: "5px",
      h1: {
        fontSize: "1.5em",
        margin: "0px",
      },
      h2: {
        fontSize: "1.2em",
        margin: "0px",
      },
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.primary.light,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
  [".meta"]: {
    backgroundColor: theme.palette.primary.light,
    padding: "8px",
    borderRadius: "4px",
    color: theme.palette.getContrastText(theme.palette.primary.light),
  },
  [".hit"]: {
    backgroundColor: theme.palette.action.hover,
    padding: "4px",
    borderRadius: "4px",
    width: "100%",
  },
}));

const ProjectToggle = styled(FormGroup)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  marginTop: -10,
  marginRight: -10,
  color: "primary",
}));

function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const excerptCache = new Map<string, string[]>();
const getExcerpts = (text: string, query: string) => {
  const cacheId = text + query;
  if (excerptCache.has(cacheId)) {
    return excerptCache.get(cacheId);
  }
  const queryRegExp = new RegExp(query.split(" ").join("|"), "g");
  const hits = [];
  let prevSentences = [];
  let lastSeenHitIndex = 0;
  let lastHit;
  const maxHits = 3;
  for (const sentence of text
    .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
    .split("|")) {
    if (sentence.match(queryRegExp)?.length > 0) {
      lastHit = prevSentences.join("") + sentence;
      prevSentences = [];
      lastSeenHitIndex = 0;
      hits.push(lastHit);
      continue;
    } else if (lastHit && lastSeenHitIndex < 3) {
      lastHit += sentence;
      lastSeenHitIndex++;
    } else if (hits.length >= maxHits) {
      break;
    }

    if (prevSentences.length < 3) {
      prevSentences.push(sentence);
    }
  }
  excerptCache.set(cacheId, hits);
  return hits;
};

export const SearchOverlay = ({
  show$,
}: {
  show$: BehaviorSubject<boolean>;
}) => {
  const show = useLayoutObservableState(show$);
  const handleClose = () => show$.next(false);

  const inputRef = useRef<HTMLInputElement>();

  const navigate = useNavigate();
  const params = useParams();

  const [searchAll, searchAll$] = useObservableAndState(
    () => new BehaviorSubject(true)
  ) as [boolean, BehaviorSubject<boolean>];
  const query$ = useObservable(
    () => new BehaviorSubject("")
  ) as BehaviorSubject<string>;
  const searchProject$ = useObservable(
    (inputs$) =>
      combineLatest([inputs$, searchAll$]).pipe(
        map(([inputs, searchAll]) =>
          !searchAll ? inputs[0].projectSlug : undefined
        )
      ),
    [params]
  );
  const [hits] = useObservableState((input$) =>
    combineLatest([query$, searchProject$]).pipe(
      debounceTime(300),
      map(([query, searchProject]) => searchDocuments(query, searchProject)),
      startWith([])
    )
  );
  useEffect(() => {
    show$.next(false);
  }, [params]);

  const renderSearch = () => {
    return (
      <Box sx={{ ...style, width: "100%" }}>
        <div>
          <Autocomplete
            id="search-input"
            freeSolo
            filterOptions={(x) => x}
            onInputChange={(event, newInputValue) => {
              query$.next(
                newInputValue
                  .split(" ")
                  .filter((q) => q.length > 2)
                  .join(" ")
              );
            }}
            onChange={useCallback(
              (e: any, option: any) => {
                if (option instanceof Object) {
                  navigate(`/docs/${option.projectSlug}/${option.slug}`, {
                    replace: true,
                  });
                }
                inputRef.current.value = "";
                show$.next(false);
              },
              [params]
            )}
            PopperComponent={PopperComponent}
            options={hits}
            getOptionLabel={(option) => option?.name ?? ""}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Box>
                  <div className="meta">
                    <h1>{option.name}</h1>
                    <h2>path: {option.path}</h2>
                  </div>
                  {getExcerpts(option.plain, query$.value).map((hit) => (
                    <p key={hit} className="hit">
                      <span>[...] </span>
                      {
                        <Highlighter
                          highlightClassName="highlight"
                          searchWords={query$.value.split(" ")}
                          autoEscape={true}
                          textToHighlight={hit}
                        />
                      }
                      <span> [...]</span>
                    </p>
                  ))}
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <Box>
                <ProjectToggle>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={searchAll}
                        onClick={() => {
                          searchAll$.next(!searchAll$.value);
                        }}
                      />
                    }
                    label="search all projects"
                  />
                </ProjectToggle>
                <TextField
                  {...params}
                  label="Type to search..."
                  inputRef={inputRef}
                  autoFocus={true}
                />
              </Box>
            )}
          />
        </div>
      </Box>
    );
  };

  return (
    <div>
      <Modal
        open={show}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {renderSearch()}
      </Modal>
    </div>
  );
};

import { Autocomplete, autocompleteClasses, TextField } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { htmdx } from "htmdx";
import {
  useLayoutObservableState,
  useObservable,
  useObservableState,
} from "observable-hooks";
import { useCallback, useEffect, useRef } from "preact/hooks";
import { BehaviorSubject, map } from "rxjs";
import { documents$ } from "../store/documents";
import { h } from "preact";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
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
      '&[aria-selected="true"]': {
        backgroundColor: "transparent",
      },
      '&[data-focus="true"], &[data-focus="true"][aria-selected="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
  [`&.${autocompleteClasses.popperDisablePortal}`]: {
    position: "relative",
  },
}));
function PopperComponent(props: PopperComponentProps) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <StyledAutocompletePopper {...other} />;
}

const SPLITTER = "*||*";
export const SearchOverlay = ({
  show$,
}: {
  show$: BehaviorSubject<boolean>;
}) => {
  const show = useLayoutObservableState(show$);
  const handleClose = () => show$.next(false);

  console.log("show search", show);
  const inputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (show) {
      inputRef.current.focus();
    }
  }, [show]);

  const currentDocuments = useObservableState(
    useObservable(() =>
      documents$.pipe(
        map((documents) =>
          Array.from(documents.values()).map((document) => ({
            ...document,
            label: document.mdx,
            id: document.slug,
          }))
        )
      )
    )
  );

  const navigate = useNavigate();
  const params = useParams();

  const renderSearch = () => {
    return (
      <Box sx={{ ...style, width: "100%" }}>
        <div>
          <Autocomplete
            id="search-input"
            freeSolo
            filterOptions={(options) => {
              if (inputRef.current?.value.length > 2) {
                return options.filter((o) =>
                  o.mdx
                    .toLowerCase()
                    .includes(inputRef.current.value.toLowerCase())
                );
              }
              return [];
            }}
            onChange={useCallback(
              (e, option) => {
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
            options={currentDocuments}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Box>
                  {htmdx(option.mdx, h, {
                    jsxTransforms: [
                      (props, type, children) => {
                        console.log(children);
                        if (children && children[0] === "Hello World") {
                          children[0] = "Foo"; // this will output <h1>Foo</h1> instead of <h1>Hello World</h1> now!
                        }
                        return [
                          props,
                          type,
                          children.flatMap((child) => {
                            if (typeof child === "string") {
                              const splitText = child
                                .replace(
                                  new RegExp(inputRef.current.value, "gi"),
                                  (s) => SPLITTER + s + SPLITTER
                                )
                                .split(SPLITTER);
                              return splitText.map((s) => {
                                if (
                                  s
                                    .toLowerCase()
                                    .includes(
                                      inputRef.current.value.toLowerCase()
                                    )
                                ) {
                                  return h("mark", {
                                    children: s,
                                  });
                                } else {
                                  return s;
                                }
                              });
                            }
                            return child;
                          }),
                        ];
                      },
                    ],
                  })}
                </Box>
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type to search..."
                inputRef={inputRef}
              />
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

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import styled from "@mui/system/styled";
import { useObservableState } from "observable-hooks";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useParams } from "react-router";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import { Contents, contents$, Project, projects$ } from "../store/contents";
import { ConditionalCard } from "./conditional_card";

interface ContentTree extends Partial<Contents> {
  children: ContentTree[];
  parent: ContentTree;
}
const RenderTree = React.memo(({ content }: { content: ContentTree[] }) => {
  const renderContent = (contentIn: ContentTree[]) => {
    return contentIn.map((item) => {
      return (
        <TreeItem nodeId={item.slug} label={item.name} key={item.slug}>
          {renderContent(item.children)}
        </TreeItem>
      );
    });
  };

  return (
    <Fragment>
      {content.map((item) => {
        return (
          <TreeItem nodeId={item.slug} label={item.name} key={item.slug}>
            {renderContent(item.children)}
          </TreeItem>
        );
      })}
    </Fragment>
  );
});
const createTree = (contents: Map<string, Contents>, project: Project) => {
  const root: ContentTree = {
    depth: -1,
    parent: null,
    children: [],
  };
  let current = root;
  contents.forEach((content) => {
    const depth = content.depth;
    const newItem: ContentTree = {
      ...content,
      depth,
      children: [],
      parent: null,
    };
    if (depth <= current.depth) {
      while (depth <= current.depth) {
        current = current.parent;
      }
    }
    newItem.parent = current;
    current.children.push(newItem);
    current = newItem;
  });
  return root.children;
};

const SidebarWrapper = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  maxWidth: 400,
  position: "sticky",
  top: 60,
  "&.editor-sidebar": {
    top: 0,
    padding: "10px",
    display: "block",
    width: "200px",
  },
  "&:not(.edit-sidebar) > .MuiPaper-root": {
    maxHeight: "calc(100vh - 180px)",
    overflow: "auto",
  },
  [".menu-button"]: {
    display: "none",
    position: "fixed",
    right: 20,
    bottom: 20,
  },
  ".MuiTreeItem-label": {
    paddingTop: "0.25em",
    paddingBottom: "0.25em",
    lineHeight: "1.3em !important",
    wordBreak: "break-word",
  },
  [theme.breakpoints.down("sm")]: {
    paddingRight: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    position: "fixed",
    top: "55px",
    width: "100%",
    maxWidth: "100%",
    flexBasis: "initial",
    height: "0%",
    padingRight: "10px",
    backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1c2128",
    overflow: "hidden",
    transition: "height .3s ease",
    ["&.show"]: {
      height: "100%",
    },
    [" .menu-button"]: {
      display: "flex",
    },
    ["& > * > *"]: {
      width: "100%",
    },
    ["ul *, form *, .MuiBox-root *"]: {
      fontSize: "1.2rem !important",
    },
  },
}));
export type SIDEBAR_MODE = "docs" | "editor";

const RenderTreeWrapper = ({
  projectObservable$,
}: {
  projectObservable$: Observable<Project>;
}) => {
  const [content] = useObservableState(() =>
    combineLatest([contents$, projectObservable$]).pipe(
      map(([contents, project]) => {
        try {
          return createTree(contents.get(project.slug), project);
        } catch (e) {
          return undefined;
        }
      })
    )
  );
  return content ? (
    <RenderTree content={content} />
  ) : (
    <CircularProgress></CircularProgress>
  );
};
export function Sidebar({
  onNodeSelect,
  mode,
  onProjectSelect,
}: {
  onNodeSelect: (nodeSlug: string) => void;
  onProjectSelect: (projectSlug: string) => void;
  mode: SIDEBAR_MODE;
}) {
  const [expanded, setExpanded] = useState([]);
  const params = useParams();

  const handleToggle = (
    event: React.SyntheticEvent<Element, Event>,
    nodeIds: string[]
  ) => {
    if ((event.target as any).tagName === "svg") {
      setExpanded(nodeIds);
    }
  };

  const [projects] = useObservableAndState(() => projects$);

  const [project, projectObservable$] = useObservableAndState(
    (inputs$) =>
      combineLatest(projects$, inputs$).pipe(
        map(([projects, [currentProject]]) => projects.get(currentProject))
      ),
    [params.projectSlug]
  );
  const handleExpandClick = useCallback(() => {
    if (project) {
      setExpanded((oldExpanded) =>
        oldExpanded.length === 0
          ? Array.from(contents$.value.get(project.slug).values()).map(
              (i) => i.slug
            )
          : []
      );
    }
  }, [project]);

  const contents = useObservableState(contents$);
  useEffect(() => {
    if (project) {
      const content = contents.get(project.slug);
      if (content) {
        setExpanded(Array.from(content.values()).map((item) => item.slug));
      }
    }
  }, [project, contents]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  useLayoutEffect(() => {
    if (!matches) {
      setShowMobileSidebar(false);
    }
  }, [matches]);

  return (
    <SidebarWrapper
      item
      xs={3}
      className={
        (showMobileSidebar ? "show" : "") +
        " " +
        (mode === "editor" ? "editor-sidebar" : "docs-sidebar")
      }
    >
      <ConditionalCard
        showCard={mode === "docs"}
        sx={{ padding: 2, position: "sticky", top: "80px" }}
      >
        <Fab color="secondary" aria-label="add" className="menu-button">
          {showMobileSidebar ? (
            <CloseIcon onClick={() => setShowMobileSidebar(false)} />
          ) : (
            <MenuIcon onClick={() => setShowMobileSidebar(true)} />
          )}
        </Fab>
        {projects.size > 1 && (
          <Box sx={{ mb: 1 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Project
              </InputLabel>
              {project && (
                <NativeSelect
                  defaultValue={project.slug}
                  inputProps={{
                    name: "age",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e) => {
                    onProjectSelect(e.target.value as string);
                  }}
                >
                  {Array.from(projects).map(([slug, p]) => (
                    <option key={slug} value={slug}>
                      {p.name}
                    </option>
                  ))}
                </NativeSelect>
              )}
            </FormControl>
          </Box>
        )}
        <Box sx={{ mb: 1 }}>
          <Button onClick={handleExpandClick}>
            {expanded.length === 0 ? "Expand all" : "Collapse all"}
          </Button>
        </Box>
        {params.contentSlug && (
          <TreeView
            aria-label="controlled"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={handleToggle}
            onNodeSelect={(event: any, nodeId: string) => {
              if (event.target.tagName !== "svg") {
                onNodeSelect(nodeId);
              }
            }}
            selected={mode !== "editor" ? params.contentSlug : ""}
          >
            <RenderTreeWrapper
              projectObservable$={projectObservable$}
            ></RenderTreeWrapper>
          </TreeView>
        )}
      </ConditionalCard>
    </SidebarWrapper>
  );
}
export default Sidebar;

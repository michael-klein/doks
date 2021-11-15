import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { Fragment } from "preact";
import { useCallback, useState, useEffect } from "preact/hooks";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Contents, contents$, Project, projects$ } from "../store/contents";
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { Params, useNavigate, useParams } from "react-router";
import { useParamsObservable } from "../hooks/use_params_observable";
import { useObservable, useObservableState } from "observable-hooks";
import { useObservableAndState } from "../hooks/use_observable_and_state";
import { useObservableWithSuspense } from "../hooks/use_observable_with_suspense";
import { Suspense } from "preact/compat";

interface ContentTree extends Partial<Contents> {
  children: ContentTree[];
}
const RenderTree = ({
  projectObservable$,
  params,
}: {
  projectObservable$: Observable<Project>;
  params: Readonly<Params<string>>;
}) => {
  const content = useObservableWithSuspense(() =>
    combineLatest(contents$, projectObservable$).pipe(
      map(([contents, project]) => {
        try {
          return createTree(contents.get(project.slug), project);
        } catch (e) {
          return undefined;
        }
      })
    )
  );
  const renderContent = (contentIn: ContentTree[]) => {
    return contentIn.map((item) => {
      return (
        <TreeItem nodeId={item.slug} label={item.name}>
          {renderContent(item.children)}
        </TreeItem>
      );
    });
  };

  return (
    <Fragment>
      {content.map((item) => {
        return (
          <TreeItem nodeId={item.slug} label={item.name}>
            {renderContent(item.children)}
          </TreeItem>
        );
      })}
    </Fragment>
  );
};
const createTree = (contents: Map<string, Contents>, project: Project) => {
  let current: ContentTree[] = [
    {
      depth: 0,
      children: [],
    },
  ];
  contents.forEach((content) => {
    const depth = project.depthMap.get(content.depth);
    if (depth > current[current.length - 1].depth) {
      const newItem: ContentTree = { ...content, depth, children: [] };
      current[current.length - 1].children[
        current[current.length - 1].children.length - 1
      ].children.push(newItem);
      current.push(newItem);
      return;
    } else if (depth < current[current.length - 1].depth) {
      current.pop();
    }
    current[current.length - 1].children.push({
      ...content,
      depth,
      children: [],
    });
  });
  return current[0].children;
};

export function Sidebar() {
  const [expanded, setExpanded] = useState([]);
  const params = useParams();

  const handleToggle = (
    event: React.SyntheticEvent<Element, Event>,
    nodeIds: string[]
  ) => {
    if (event.target.tagName === "svg") {
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

  const navigate = useNavigate();
  const contents = useObservableState(contents$);
  useEffect(() => {
    if (project) {
      const content = contents.get(project.slug);
      if (content) {
        setExpanded(
          Array.from(content.values())
            .filter((item) => project.depthMap.get(item.depth) < 3)
            .map((item) => item.slug)
        );
      }
    }
  }, [project, contents]);

  const onNodeSelect = useCallback(
    (nodeId: string) => {
      navigate(`/docs/${params.projectSlug || project.slug}/${nodeId}`, {
        replace: true,
      });
    },
    [project, params]
  );

  useEffect(() => {
    if (!params.contentSlug && contents.get(params.projectSlug)) {
      navigate(
        `/docs/${params.projectSlug}/${
          params.contentSlug ||
          Array.from(contents.get(params.projectSlug).values())[0].slug
        }`,
        { replace: true }
      );
    }
  }, [contents, params]);

  return (
    <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
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
                  navigate(`/docs/${e.target.value}`, {
                    replace: true,
                  });
                }}
              >
                {Array.from(projects).map(([slug, p]) => (
                  <option value={slug}>{p.name}</option>
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
            console.log(event.target);
            if (event.target.tagName !== "svg") {
              onNodeSelect(nodeId);
            }
          }}
          selected={params.contentSlug}
        >
          <Suspense fallback="loading sidebar">
            <RenderTree
              projectObservable$={projectObservable$}
              params={params}
            ></RenderTree>
          </Suspense>
        </TreeView>
      )}
    </Box>
  );
}

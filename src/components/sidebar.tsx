import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import { useCallback, useState } from "preact/hooks";
import { useObservable } from "../hooks/use_observable";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import {
  Contents,
  contents$,
  currentProject$,
  Project,
  projects$,
} from "../store/contents";
import { useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router";

interface ContentTree extends Partial<Contents> {
  children: ContentTree[];
}
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

  const [projects] = useObservable(projects$);
  const [project, projectObservable] = useObservable((suspend) =>
    combineLatest(projects$, currentProject$).pipe(
      map(([projects, currentProject]) => projects.get(currentProject))
    )
  );
  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0
        ? Array.from(contents$.value.get(currentProject$.value).values()).map(
            (i) => i.slug
          )
        : []
    );
  };
  const [content] = useObservable((suspend) =>
    combineLatest(contents$, projectObservable).pipe(
      map(([contents, project]) => {
        try {
          return createTree(contents.get(project.slug), project);
        } catch (e) {
          return suspend();
        }
      })
    )
  );

  const navigate = useNavigate();
  useEffect(() => {
    setExpanded(
      Array.from(contents$.value.get(project.slug).values())
        .filter((item) => project.depthMap.get(item.depth) < 3)
        .map((item) => item.slug)
    );
  }, [project]);

  useEffect(() => {
    if (!params.projectSlug || !params.contentSlug) {
      navigate(
        `/docs/${params.projectSlug || project.slug}/${
          params.contentSlug || content[0].slug
        }`,
        { replace: true }
      );
    }
  }, [project, content, params]);

  const renderContent = (content: ContentTree[]) => {
    return content.map((item) => {
      return (
        <TreeItem nodeId={item.slug} label={item.name}>
          {renderContent(item.children)}
        </TreeItem>
      );
    });
  };

  const onNodeSelect = useCallback(
    (nodeId: string) => {
      navigate(`/docs/${params.projectSlug || project.slug}/${nodeId}`, {
        replace: true,
      });
    },
    [project, params]
  );

  return (
    <Box sx={{ height: 270, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}>
      {projects.size > 1 && (
        <Box sx={{ mb: 1 }}>
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Project
            </InputLabel>
            <NativeSelect
              defaultValue={project.slug}
              inputProps={{
                name: "age",
                id: "uncontrolled-native",
              }}
            >
              {Array.from(projects).map(([slug, p]) => (
                <option value={slug}>{p.name}</option>
              ))}
            </NativeSelect>
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
          {renderContent(content)}
        </TreeView>
      )}
    </Box>
  );
}

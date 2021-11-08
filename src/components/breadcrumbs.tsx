import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const BreadCrumbs = () => {
  return (
    <Box sx={{ marginBottom: 3, marginLeft: 2 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </Box>
  );
};

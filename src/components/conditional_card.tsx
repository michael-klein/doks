import { Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { SxProps } from "@mui/system/styleFunctionSx/styleFunctionSx";
export const ConditionalCard = ({
  children,
  showCard,
  elevation = 1,
  sx = {},
}: {
  children: any;
  showCard?: boolean;
  elevation?: number;
  sx?: SxProps<Theme>;
}) => {
  if (!showCard) {
    return children;
  }
  return (
    <Card elevation={elevation} sx={sx}>
      {children}
    </Card>
  );
};

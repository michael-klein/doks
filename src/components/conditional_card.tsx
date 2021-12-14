import Card from "@mui/material/Card";
export const ConditionalCard = ({
  children,
  showCard,
}: {
  children: any;
  showCard?: boolean;
}) => {
  if (!showCard) {
    return children;
  }
  return (
    <Card elevation={1} sx={{ padding: 2, position: "sticky", top: "80px" }}>
      {children}
    </Card>
  );
};

import { Card, Grid } from "@radix-ui/themes";
import React from "react";

const ProductsGrid = () => {
  return (
    <Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="3" width="100%">
      <Card>1</Card>
      <Card>1</Card>
      <Card>1</Card>
      <Card>1</Card>
      <Card>1</Card>
    </Grid>
  );
};

export default ProductsGrid;

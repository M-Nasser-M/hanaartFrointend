"use client";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  handleNavigation: (pageNo: number) => void;
  numberOfPages: number;
};

const Pagination = (props: Props) => {
  const pageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= props.numberOfPages; i++) {
      buttons.push(
        <Button key={i} onClick={() => props.handleNavigation(i)}>
          {i}
        </Button>
      );
    }
    return buttons;
  };
  return (
    <Flex direction="row" justify="between">
      <IconButton>
        <ArrowLeft />{" "}
      </IconButton>
      <Flex direction="row" gap="4" justify="center">
        {pageButtons()}
      </Flex>
      <IconButton>
        {" "}
        <ArrowRight />
      </IconButton>
    </Flex>
  );
};

export default Pagination;

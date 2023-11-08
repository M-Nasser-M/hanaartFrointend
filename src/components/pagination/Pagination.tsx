"use client";
import { currentStorePageAtom } from "@/atoms/atoms";
import { Button, Flex, IconButton } from "@radix-ui/themes";
import { useAtomValue } from "jotai";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

type Props = {
  handleNavigation: (pageNo: number) => void;
  numberOfPages: number;
};

const Pagination = ({ numberOfPages, handleNavigation }: Props) => {
  const currentPage = useAtomValue(currentStorePageAtom);
  const pageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= numberOfPages; i++) {
      buttons.push(
        <Button
          highContrast={currentPage == i}
          key={i}
          onClick={() => handleNavigation(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };
  return (
    <Flex direction="row" justify="center">
      <Flex direction="row" gap="4" justify="center">
        {pageButtons()}
      </Flex>
    </Flex>
  );
};

export default Pagination;

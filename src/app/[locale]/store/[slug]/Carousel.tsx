"use client";
import { AspectRatio, Box, Flex } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Cover, Image } from "@/types/sharedTypes";
import React, { ReactNode } from "react";
import NextImage from "next/image";
import Glider from "react-glider";

import "glider-js/glider.min.css";

type Props = { images: Image[] | [] | null | undefined; cover: Cover };

const GliderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box className="glider-contain h-32 relative my-0 mx-auto px-2">
      {children}
    </Box>
  );
};

const Carousel = ({ images, cover }: Props) => {
  return (
    <>
      <AspectRatio ratio={16 / 9}>
        <NextImage
          src={cover.url}
          alt={cover.alternativeText || ""}
          fill
          placeholder="blur"
          blurDataURL={cover.placeholder}
        />
      </AspectRatio>
      {images && images.length > 0 && (
        <Glider
          className="glider"
          containerElement={GliderContainer}
          iconRight={
            <ChevronRight className="h-[2.5rem] w-[2.5rem] text-crimsonA-11" />
          }
          iconLeft={
            <ChevronLeft className="h-[2.5rem] w-[2.5rem] text-crimsonA-11" />
          }
          hasArrows
          slidesToShow={3}
          slidesToScroll={1}
          skipTrack
        >
          <Box className="glider-track h-32 gap-2">
            {images.map((image) => (
              <Flex key={image.id} position="relative">
                <NextImage
                  src={image.formats?.thumbnail?.url || ""}
                  alt={image.alternativeText || ""}
                  fill
                  placeholder="blur"
                  blurDataURL={image.placeholder}
                />
              </Flex>
            ))}
          </Box>
        </Glider>
      )}
    </>
  );
};

export default Carousel;

"use client";
import { AspectRatio, Box, Flex } from "@radix-ui/themes";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Image } from "@/types/sharedTypes";
import { useHydrateAtoms } from "jotai/utils";
import React, { ReactNode } from "react";
import { atom, useAtom } from "jotai";
import NextImage from "next/image";
import Glider from "react-glider";

import "glider-js/glider.min.css";

type Props = { images: Image[] | [] | null | undefined; cover: Image };

const GliderContainer = ({ children }: { children: ReactNode }) => {
  return (
    <Box className="glider-contain h-32 relative my-0 mx-auto px-2">
      {children}
    </Box>
  );
};

const defaultImage: Image = {
  width: 0,
  height: 0,
  url: "",
  placeholder: "",
};

const currentImageAtom = atom<Image>(defaultImage);

const Carousel = ({ images, cover }: Props) => {
  useHydrateAtoms([[currentImageAtom, cover]]);
  const [currentImage, setCurrentImage] = useAtom(currentImageAtom);

  return (
    <>
      <AspectRatio ratio={16 / 9}>
        <NextImage
          src={currentImage.url}
          alt={currentImage.alternativeText || ""}
          fill
          placeholder="blur"
          blurDataURL={currentImage.placeholder}
        />
      </AspectRatio>
      {images && images.length > 0 && (
        <Glider
          className="glider"
          containerElement={GliderContainer}
          iconRight={
            <ChevronRight className="h-[2.5rem] w-[2.5rem] text-crimsonA-11 cursor-pointer" />
          }
          iconLeft={
            <ChevronLeft className="h-[2.5rem] w-[2.5rem] text-crimsonA-11 cursor-pointer" />
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
                  className="cursor-pointer"
                  src={image.formats?.thumbnail?.url || ""}
                  alt={image.alternativeText || ""}
                  fill
                  placeholder="blur"
                  blurDataURL={image.placeholder}
                  onClick={() => setCurrentImage(image)}
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

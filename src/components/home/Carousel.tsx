import { Flex, Image, StyleProps, keyframes } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const fade = keyframes`
  from {opacity: 0.1; transform: scale(0.8)}
  to {opacity: 1; transform: scale(1)}
`;

const showProps: StyleProps = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  display: 'flex',
  borderRadius: 'inherit',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  animation: `${fade} 1.5s ease-in-out`,
};

const notShowProps: StyleProps = {
  display: 'none',
};

type CarouselProps = {
  images: string[];
};
const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [counter, setCounter] = useState(1);
  const [pause, setPause] = useState(false);

  const handleNext = () => {
    if (counter !== images.length) {
      setCounter(counter + 1);
    } else {
      setCounter(1);
    }
  };

  const handleMouse = () => {
    setPause(!pause);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!pause) {
        handleNext();
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <Flex
      pos="relative"
      width="100%"
      height="100%"
      borderRadius="50%"
      onMouseEnter={handleMouse}
      onMouseLeave={handleMouse}
    >
      {images.map((src, index) => {
        const show = counter - 1 === index;
        return (
          <Flex sx={show ? showProps : notShowProps} key={index}>
            <Image
              borderRadius="inherit"
              height="100%"
              width="100%"
              src={src}
              alt={`Carousel img ${index + 1}`}
              objectFit="scale-down"
            />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Carousel;

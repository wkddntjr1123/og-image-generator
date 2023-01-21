/* pages/index.js */

import { chakra, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import * as url from "url";

export default function Home() {
  const router = useRouter()
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const title = searchParams.get('title');
  const username = searchParams.get('username');
  const imgUrl = searchParams.get('image') || '/empty.png';

  return (
      <>
        <chakra.div
            position="relative"
            display="flex"
            flexDirection="column"
            width={1200}
            height={630}
            p={16}
            justifyContent="space-between"
            alignItems="center"
            borderWidth="2rem"
            borderColor="gray.600"
            backgroundImage='back.jpg'
            backgroundSize='cover'
        >
          <div/>
          <Heading px="4rem" textAlign="center" fontSize="4.2rem" color='white'>
            {title}
          </Heading>
          <HStack spacing="1rem">
            <chakra.div
                position="relative"
                width="8rem"
                height="8rem"
                borderRadius="50%"
                overflow="hidden"
            >
              <Image src={imgUrl}  alt='profile image' width={1200} height={630}/>
            </chakra.div>
            <Heading fontSize="2rem" color='white'>{username}</Heading>
          </HStack>
        </chakra.div>
      </>
  );
}
import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';
import useSWR from 'swr';
import { buildImageUrl } from '../../utils/api';
import {
  Badge,
  Box,
  Center,
  CircularProgress,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
  Image as ChakraImage,
  Flex,
  Spacer,
  CircularProgressLabel
} from '@chakra-ui/react';
import Layout from '../../components/Layout';
import HistoryButton from '../../components/HistoryButton';
import WatchlistButton from '../../components/WatchlistButton';
import Link from 'next/link';

const MovieContent = () => {
  const router = useRouter();
  const { id } = useRouter().query;
  const { data, error } = useSWR(id && `/api/movies/${id}`);

  console.log({ data });

  if (error) {
    return (
      <Text color="red">
        Error fetching movie with ID {id}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <Stack direction={['column', 'row']} spacing={4}>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Box minW="300px" pos="relative">
        <HStack pos="absolute" zIndex={1} top={2} right={2}>
          <HistoryButton />
        </HStack>
        <HStack pos="absolute" zIndex={1} top={2} left={2}>
          <WatchlistButton />
        </HStack>
        <Image
          src={buildImageUrl(data.poster_path, 'w300')}
          alt="Movie poster"
          layout="responsive"
          width="300"
          height="450"
          objectFit="contain"
          unoptimized
        />
      </Box>
      <Stack>
        <HStack justify="space-between">
          <Heading as="h2">{data.title}</Heading>
          <Box>
            <Tag colorScheme="red" variant="solid">
              {data.release_date}
            </Tag>
          </Box>
        </HStack>
        <Box>{data.tagline}</Box>

        <Stack direction="row">
          {data.genres?.map((genre) => (
            <Badge key={genre.id} colorScheme="red" variant="outline" fontSize='0.8em'>
              {genre.name}
            </Badge>
          ))}
        </Stack>

        <Box>{data.overview}</Box>

        <Box>
          <CircularProgress 
            value={data.vote_average*10}
            color='green.500'
            thickness='0.4em'
            size='2.5em'
            >
            <CircularProgressLabel fontSize='xl'>
              {data.vote_average}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Stack>
    </Stack>
  );
};

export default function Movie() {
  return (
    <Layout>
      <Container h="full">
        <MovieContent />
      </Container>
    </Layout>
  );
}
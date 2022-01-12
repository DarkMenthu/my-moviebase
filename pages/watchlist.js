import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../components/Layout';
import { 
  UnorderedList,
  ListItem,
  Text,
  Button,
  Badge,
  Center,
  Heading,
  Container,
  VStack
} from '@chakra-ui/react';

function WatchlistList() {
  const { data, error } = useSWR(`/api/watchlist`);

  console.log(data?.data);

  if (!data?.data?.length) {
    return (
        <Center>
          <Heading as="h2">Nothing to see in Watchlist</Heading>
        </Center>
    )
  }
  if (error) {
    return (
        <Center>
          <Heading as="h2" color="red">
            Oops there is an error, please try again later: {JSON.stringify(error)}
          </Heading>
        </Center>
    );
  }

  return (
    <UnorderedList stylePosition="inside">
      {data.data.map(({ id, title }) => (
        <ListItem key={id}>
          <Link href={`/movies/${id}`} passHref>
            <Button
              as="a"
              variant="link"
              rightIcon={<Badge></Badge>}
              >
              <Text as="span">{title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default function Watchlist() {
  return (
    <Layout title="Watchlist">
      <Container>
        <VStack spacing={4} align="stretch">
          <WatchlistList />
        </VStack>
      </Container>
    </Layout>
  );
}
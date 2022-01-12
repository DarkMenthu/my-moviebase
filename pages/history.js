import Link from 'next/link';
import useSWR from 'swr';
import Layout from '../components/Layout';
import { 
  UnorderedList,
  ListItem,
  Text,
  Button,
  Badge,
  Container,
  VStack,
  Center,
  Heading
} from '@chakra-ui/react';

function HistoryList() {
  const { data, error } = useSWR(`/api/history`);

  console.log(data?.data);

  if (!data?.data?.length) {
    return (
        <Center>
          <Heading as="h2">Nothing to see in History</Heading>
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
            <Button as="a" variant="link" rightIcon={<Badge></Badge>}>
              <Text as="span">{title} </Text>
            </Button>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}

export default function History() {
  return (
    <Layout title="History">
      <Container>
        <VStack spacing={4} align="stretch">
          <HistoryList />
        </VStack>
      </Container>
    </Layout>
  );
}

import { Center, Heading, Stack, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout title="NUTflex">
      <Center h="full">
        <Stack>
          <Heading as="h2">Welcome to NUTflex</Heading>
          <Text>The movie world, in sandbox..</Text>
        </Stack>
      </Center>
    </Layout>
  );
}
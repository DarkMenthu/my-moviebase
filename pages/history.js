import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useSWR from 'swr';
import {
  Input,
  IconButton,
  Container,
  UnorderedList,
  ListItem,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
  Badge,
  Center,
  Stack,
  Heading
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Layout from '../components/Layout';
import { fetcher } from '../utils/api';

export default function History() {
  return (
    <Layout title="NUTflex">
      <Center h="full">
        <Stack>
          <Heading as="h2">ON WORK</Heading>
        </Stack>
      </Center>
    </Layout>
  );
}
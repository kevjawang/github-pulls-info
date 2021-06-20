import React, { useEffect, useState } from 'react';
import PullRequestCard from './PullRequestCard';
import { usePullListGetReq } from '../hooks/rest';
import { Button, SimpleGrid } from '@chakra-ui/react';
import ErrorBox from './ErrorBox';
import Loading from './Loading';

import { Box } from '@chakra-ui/react';

interface PullRequestsProps {
  url: string;
}

const PullRequests = (props: PullRequestsProps) => {
  const [page, setPage] = useState(1);
  const { data, error, loading } = usePullListGetReq(props.url, page);

  useEffect(() => {
    setPage(1);
  }, [props.url]);

  if (error) {
    return <ErrorBox />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SimpleGrid spacing="4px" minChildWidth="400px">
        {data.map((pullRequest) => (
          <Box key={pullRequest.number}>
            {pullRequest.url && <PullRequestCard url={pullRequest.url} />}
          </Box>
        ))}
      </SimpleGrid>
      <Box>
        {page > 1 && <Button onClick={() => setPage(page - 1)}>Prev</Button>}
        {data.length > 0 && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </Box>
    </>
  );
};

export default PullRequests;

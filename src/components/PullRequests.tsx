import React, { useEffect, useState } from "react";
import PullRequestCard from "./PullRequestCard";
import { IPullRequest } from "../types/GithubPull";
import { getPulls } from "../utils/rest";
import { Button, SimpleGrid } from "@chakra-ui/react";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";

import { Box } from "@chakra-ui/react";

interface PullRequestsProps {
  url: string;
}

interface IState {
  loading: boolean;
  error: boolean;
  pullRequests: IPullRequest[];
}

const defaultState = {
  loading: true,
  error: false,
  pullRequests: [],
};

const PullRequests = (props: PullRequestsProps) => {
  const [state, setState] = useState<IState>(defaultState);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [props.url]);

  useEffect(() => {
    getPulls(props.url, page)
      .then((response) => {
        setState({
          loading: false,
          error: false,
          pullRequests: response.data,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          error: true,
          pullRequests: [],
        });
      });
  }, [props.url, page]);

  if (state.error) {
    return <ErrorBox />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <>
      <SimpleGrid spacing="4px" minChildWidth="400px">
        {state.pullRequests.map((pullRequest) => (
          <Box key={pullRequest.number}>
            {pullRequest.url && <PullRequestCard url={pullRequest.url} />}
          </Box>
        ))}
      </SimpleGrid>
      <Box>
        {page > 1 && <Button onClick={() => setPage(page - 1)}>Prev</Button>}
        {state.pullRequests.length > 0 && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </Box>
    </>
  );
};

export default PullRequests;

import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IPullRequest } from "../types/GithubPulls";
import { getPull } from "../utils/queries";

interface CardProps {
  url: string;
}

interface IState {
  loading: boolean;
  error: boolean;
  pullRequest: IPullRequest;
}

const defaultState = {
  loading: true,
  error: false,
  pullRequest: {},
};

export const Card = (props: CardProps) => {
  const [state, setState] = useState<IState>(defaultState);

  useEffect(() => {
    getPull(props.url)
      .then((response) => {
        setState({
          loading: false,
          error: false,
          pullRequest: response.data,
        });
      })
      .catch(() => {
        setState({
          loading: false,
          error: true,
          pullRequest: {},
        });
      });
  }, []);

  if (state.error) {
    return (
      <Box>
        Error
      </Box>
    )
  }

  if (state.loading) {
    return (
      <Box>
        <Spinner />
      </Box>
    )
  }

  return (
    <Box>
      <Flex flexDirection="column">
        <Text>{state.pullRequest.title}</Text>
        <Text>Commits: {state.pullRequest.commits}</Text>
        <Text>Comments: {state.pullRequest.comments} </Text>
      </Flex>
    </Box>
  );
};

export default Card;

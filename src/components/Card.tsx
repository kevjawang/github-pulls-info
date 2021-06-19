import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IPullRequest } from "../types/GithubPulls";
import { getPull } from "../utils/rest";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";

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
    return <ErrorBox />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Box borderRadius="lg" borderWidth="1px" margin="4px">
      <Flex flexDirection="column">
        <Text>{state.pullRequest.title}</Text>
        <Text>Commits: {state.pullRequest.commits}</Text>
        <Text>Comments: {state.pullRequest.comments} </Text>
      </Flex>
    </Box>
  );
};

export default Card;

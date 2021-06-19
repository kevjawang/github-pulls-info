import React, { useEffect, useState } from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { IPullRequest } from "../types/GithubPull";
import { getPull } from "../utils/rest";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";

interface PullRequestCardProps {
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

export const PullRequestCard = (props: PullRequestCardProps) => {
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
  }, [props.url]);

  if (state.error) {
    return <ErrorBox />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <Box borderRadius="lg" borderWidth="1px" margin="4px" maxWidth="400px">
      <Flex flexDirection="column" padding="2px">
        <Box fontWeight="semibold">
          {state.pullRequest.title}{" "}
          <Link href={state.pullRequest.html_url} isExternal>
            ({state.pullRequest.number})
          </Link>
        </Box>
        <Box>Commits: {state.pullRequest.commits}</Box>
        <Box>Comments: {state.pullRequest.comments}</Box>
        <Box>
          {"Opened by "}
          <Link href={state.pullRequest.user?.html_url} isExternal>
            {state.pullRequest.user?.login}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default PullRequestCard;

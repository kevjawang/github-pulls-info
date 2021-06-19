import React, { useEffect, useState } from "react";
import Card from "./Card";
import { IPullRequest } from "../types/GithubPulls";
import { getPulls } from "../utils/queries";
import { VStack } from "@chakra-ui/react";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";

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

  useEffect(() => {
    getPulls(props.url)
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
  }, []);

  if (state.error) {
    return <ErrorBox />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <VStack>
      {state.pullRequests.map((pullRequest) => {
        pullRequest.url && <Card url={pullRequest.url} />;
      })}
    </VStack>
  );
};

export default PullRequests;

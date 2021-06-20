import React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { useSinglePullGetReq } from "../hooks/rest";
import ErrorBox from "./ErrorBox";
import Loading from "./Loading";

interface PullRequestCardProps {
  url: string;
}

export const PullRequestCard = (props: PullRequestCardProps) => {
  const { data, error, loading } = useSinglePullGetReq(props.url);

  if (error || data === null) {
    return <ErrorBox />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Box borderRadius="lg" borderWidth="1px" margin="4px" maxWidth="400px">
      <Flex flexDirection="column" padding="2px">
        <Box fontWeight="semibold">
          {data.title}{" "}
          <Link href={data.html_url} isExternal>
            ({data.number})
          </Link>
        </Box>
        <Box>Commits: {data.commits}</Box>
        <Box>Comments: {data.comments}</Box>
        <Box>
          {"Opened by "}
          <Link href={data.user?.html_url} isExternal>
            {data.user?.login}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default PullRequestCard;

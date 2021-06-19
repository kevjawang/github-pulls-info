import React, { useState } from "react";
import { Box, Button, FormControl, Input, Text } from "@chakra-ui/react";
import PullRequests from "./components/PullRequests";
import { repoRegex } from "./utils/regex";

const Home = () => {
  const [formURL, setFormURL] = useState("");
  const [repoURL, setRepoURL] = useState("");
  const [showPulls, setShowPulls] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (repoRegex.test(formURL)) {
      setShowPulls(true);
      setRepoURL(formURL);
      setShowError(false);
    } else {
      setShowPulls(false);
      setShowError(true);
    }
  };

  return (
    <Box>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
      >
        <FormControl>
          <Input
            maxW="500px"
            placeholder="Enter a link to github repository"
            onChange={(event) => setFormURL(event.target.value)}
          />
          <Button type="submit">Go</Button>
        </FormControl>
      </form>
      {showPulls && <PullRequests url={repoURL} />}
      {showError && <Text>Invalid URL.</Text>}
    </Box>
  );
};

export default Home;

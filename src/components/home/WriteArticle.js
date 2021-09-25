import React, { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Divider,
  Button,
  useToast,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import Nav from "../layout/Nav";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";
import { useFirebase } from "../../contexts/FirebaseContext";

import { v4 as uuidv4 } from "uuid";

function WriteArticle() {
  const { currentUser } = useAuth();
  const { postArticle } = useFirebase();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState("public");
  const toast = useToast();
  const history = useHistory();

  const handlePost = async () => {
    if (!title || !subtitle || !articleContent) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      setLoading(true);
      await postArticle({
        articleID: uuidv4(),
        authorID: currentUser.uid,
        authorEmail: currentUser.email,
        authorUsername: `@${currentUser.email.split("@")[0]}`,
        content: {
          title,
          subtitle,
          articleContent,
        },
        when: Date.now(),
        stars: 0,
        visibility: visibility,
      });

      toast({
        title: "Article posted",
        status: "success",
        duration: 5000,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to post article",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <Box d="flex" justifyContent="center" alignItems="center">
      <Box
        w={["100vw", null, null, "70vw"]}
        d="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Nav />

        <Box px={["6", "10"]}>
          <Text fontSize={["2xl", "3xl"]} textAlign="center">
            Write your heart out!
          </Text>
          <Text fontSize={["sm", "md"]} textAlign="center" color="blue.500">
            writing as {`@${currentUser.email.split("@")[0]}`}
          </Text>

          <Textarea
            variant="unstyled"
            placeholder="Title"
            fontSize={["4xl", "5xl"]}
            mt="10"
            resize="vertical"
            rows={1}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="unstyled"
            placeholder="Subtitle"
            fontSize={["xl", "2xl"]}
            resize="vertical"
            rows={1}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <Divider my={[6, 10]} />

          <Textarea
            variant="unstyled"
            placeholder="Write your story here"
            fontSize={["md", "lg"]}
            resize="vertical"
            onChange={(e) => setArticleContent(e.target.value)}
            rows={8}
          />

          <Divider my={[6, 10]} />

          <Box d="flex" flexDirection="column">
            <Box
              d="flex"
              d="flex"
              flexDirection={["column", null, "row"]}
              justifyContent="flex-start"
              alignItems={[null, null, "center"]}
            >
              <Text fontSize={["xl", "2xl"]} mr="4" mb={[2, 2, 0]}>
                Choose your article's visibility
              </Text>

              <RadioGroup
                onChange={setVisibility}
                value={visibility}
                mb={[2, 2, 0]}
              >
                <Stack direction="row">
                  <Radio mr="2" isChecked={true} size="lg" value="public">
                    Public
                  </Radio>
                  <Radio size="lg" value="private">
                    Private
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
            <Text fontSize={["sm", "md"]} opacity="0.4" mb="2">
              {visibility === "private"
                ? "Your article will not be shared with the community and will be visible only to you. You can change it later anytime."
                : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
            </Text>
          </Box>

          <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={["column-reverse", null, "row"]}
            my="6"
            mb={[6, 6, 10]}
          >
            <Button
              fontSize={["md", "lg"]}
              py={8}
              isFullWidth
              // variant="ghost"
              mr={["0", "0", "4"]}
              mt={["4", "0"]}
              as={Link}
              to="/"
            >
              Discard
            </Button>
            <Button
              fontSize={["md", "lg"]}
              py={8}
              isFullWidth
              colorScheme="blue"
              onClick={handlePost}
              isLoading={loading}
            >
              Post {visibility === "private" ? "privately" : "publicly"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WriteArticle;

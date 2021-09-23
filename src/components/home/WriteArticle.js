import React, { useState } from "react";
import {
  Box,
  Text,
  Textarea,
  Divider,
  Button,
  useToast,
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

          <Divider my="10" />

          <Textarea
            variant="unstyled"
            placeholder="Write your story here"
            fontSize={["md", "lg"]}
            resize="vertical"
            onChange={(e) => setArticleContent(e.target.value)}
            rows={8}
          />

          <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection={["column-reverse", null, "row"]}
            my="6"
          >
            <Button
              fontSize={["md", "lg"]}
              py={8}
              isFullWidth
              variant="ghost"
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
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WriteArticle;

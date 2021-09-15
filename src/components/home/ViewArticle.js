import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  IconButton,
  useToast,
  Spacer,
  Button,
  Input,
} from "@chakra-ui/react";
import { StarIcon, AddIcon, ArrowRightIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";
import { useAuth } from "../../contexts/AuthContext";
import { doc } from "@firebase/firestore";

function ViewArticle() {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { getSpecificArticle, giveAStar, postComment, getComments } =
    useFirebase();
  const { currentUser } = useAuth();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const [starBtnLoading, setStarBtnLoading] = useState(false);
  const [commentBtnLoading, setCommentBtnLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const toast = useToast();
  const [docId, setDocId] = useState("");

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      setArticle(data.docs.map((el) => el.data()));
      setDocId(data.docs.map((el) => el.id));
    } catch (err) {
      console.log(err);
      toast({
        title: "The article you are looking for was not found",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(articleIDFromURL);
      setComments(data.docs.map((el) => el.data()));
    } catch (err) {
      console.log(err);
      toast({
        title: "Couldn't fetch comments at the moment",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  };

  useEffect(fetchArticle, []);
  useEffect(fetchComments, []);

  const handleGiveAStar = async () => {
    try {
      setStarBtnLoading(true);
      await giveAStar(docId[0]);
      fetchArticle();
    } catch (err) {
      console.log(err);
    }
    setStarBtnLoading(false);
  };

  const handlePostComment = async () => {
    if (!comment) {
      toast({
        title: "Cannot post empty comment",
        status: "error",
        duration: 5000,
      });
      return;
    }

    try {
      const data = {
        comment: comment,
        articleID: articleIDFromURL,
        authorID: currentUser.uid,
        when: Date.now(),
        authorEmail: currentUser.email,
        autherUsername: `@${currentUser.email.split("@")[0]}`,
      };

      setCommentBtnLoading(true);
      await postComment(data);
      toast({
        title: "Comment posted successfully",
        status: "success",
        duration: 5000,
      });
      setComment("");
      fetchComments();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to comment",
        status: "error",
        duration: 5000,
      });
    }

    setCommentBtnLoading(false);
  };

  const handleShareArticle = () => {
    // const navigator = new Navigator();
    // navigator.share(window.location.href + "");
    // console.log(window.location.href);

    // const data = {
    //   title: article[0].content.title,
    //   URL: window.location.href,
    // };

    // try {
    //   await navigator.share(data);
    // } catch (err) {
    //   console.log(err);
    // }
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Article link copied to clipboard",
      status: "success",
      duration: 5000,
    });
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return (
    <Box
      w={["100vw", null, null, "70vw"]}
      d="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Nav />
      {loading ? (
        <LoadingSmall />
      ) : (
        <>
          {article.map((el) => (
            <Box px={["6", "10"]}>
              <Text fontSize={["4xl", "5xl"]}>{el.content.title}</Text>
              <Text fontSize={["xl", "2xl"]} opacity="0.8">
                {el.content.subtitle}
              </Text>

              <Box d="flex" mt="6" flexDirection={["column", null, "row"]}>
                <Text color="blue.500" fontSize={["lg", "xl"]} mr="4">
                  {el.authorUsername}
                </Text>
                <Text opacity="0.5" fontSize={["lg", "xl"]}>
                  {getDate(el.when).slice(4, 21)}
                </Text>
                <Spacer />
                <Box
                  d="flex"
                  flexDirection="row"
                  alignItems="center"
                  mt={[2, null, 0]}
                >
                  <Text
                    fontWeight="semibold"
                    color="yellow.500"
                    fontSize={["lg", "xl"]}
                  >
                    {el.stars}
                  </Text>
                  <StarIcon color="yellow.500" fontSize={["lg", "xl"]} mx="2" />
                </Box>
              </Box>

              <Divider my="6" />

              <Text fontSize={["lg", "xl"]}>{el.content.articleContent}</Text>

              <Divider my="6" />

              <Box d="flex">
                {/* <Spacer d={["none", null, "block"]} /> */}
                <Button
                  rightIcon={<StarIcon />}
                  colorScheme="yellow"
                  variant="solid"
                  onClick={handleGiveAStar}
                  isLoading={starBtnLoading}
                  mr="2"
                >
                  Give a star
                </Button>
                <Button
                  rightIcon={<ArrowRightIcon />}
                  onClick={handleShareArticle}
                  colorScheme="blue"
                >
                  Share article
                </Button>
              </Box>

              <Box mt="10">
                <Text fontSize={["2xl", "3xl"]}>Comments</Text>
                <Box d="flex" mt="6">
                  <Input
                    variant="unstyled"
                    placeholder="Write your comment here"
                    fontSize={["xl", "2xl"]}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    mr="2"
                  />
                  <IconButton
                    icon={<AddIcon />}
                    onClick={handlePostComment}
                    isLoading={commentBtnLoading}
                  />
                </Box>

                {comments.map((el) => (
                  <Box mt="6">
                    <Box d="flex" mb="1">
                      <Text color="blue.500" fontSize={["md", "lg"]} mr="2">
                        {el.autherUsername}
                      </Text>
                      <Text opacity="0.5" fontSize={["md", "lg"]}>
                        {getDate(el.when).slice(4, 21)}
                      </Text>
                    </Box>
                    <Text fontSize={["lg", "xl"]} mr="2">
                      {el.comment}
                    </Text>
                    <Divider my="6" />
                  </Box>
                ))}
              </Box>

              {/* <IconButton colorScheme="" icon={<StarIcon />} /> */}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

export default ViewArticle;

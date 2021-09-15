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
import { StarIcon, AddIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";
import { useAuth } from "../../contexts/AuthContext";

const Comments = () => {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { postComment, getComments } = useFirebase();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [commentBtnLoading, setCommentBtnLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const toast = useToast();

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

  useEffect(fetchComments, []);

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

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  return loading ? (
    <LoadingSmall />
  ) : (
    <Box mt="10">
      <Text fontSize={["2xl", "3xl"]}>Comments</Text>
      <Box d="flex" mt="6" mb="6">
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
  );
};

export default Comments;

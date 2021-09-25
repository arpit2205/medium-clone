import React, { useState, useEffect } from "react";
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
import LoadingSmall from "../layout/LoadingSmall";

function EditArticle() {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { currentUser } = useAuth();
  const { editArticle, getSpecificArticle } = useFirebase();
  const [article, setArticle] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [docId, setDocId] = useState("");
  const [visibility, setVisibility] = useState("");
  const toast = useToast();
  const history = useHistory();

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      setArticle(data.docs.map((el) => el.data()));
      setDocId(data.docs.map((el) => el.id)[0]);
      setTitle(data.docs.map((el) => el.data())[0].content.title);
      setSubtitle(data.docs.map((el) => el.data())[0].content.subtitle);
      setArticleContent(
        data.docs.map((el) => el.data())[0].content.articleContent
      );
      setVisibility(data.docs.map((el) => el.data())[0].visibility);
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

  useEffect(fetchArticle, []);

  const handleEdit = async () => {
    if (!title || !subtitle || !articleContent) {
      toast({
        title: "Please fill all fields",
        status: "error",
        duration: 5000,
      });
      return;
    }

    const data = {
      title: title,
      subtitle: subtitle,
      articleContent: articleContent,
      visibility: visibility,
    };

    try {
      setBtnLoading(true);

      await editArticle(docId, data);

      toast({
        title: "Article updated",
        status: "success",
        duration: 5000,
      });

      history.push(`/article/${articleIDFromURL}`);
    } catch (err) {
      console.log(err);

      toast({
        title: "Failed to update article",
        status: "error",
        duration: 5000,
      });
    }

    setBtnLoading(false);
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

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            {article.map((el) => (
              <Box px={["6", "10"]}>
                <Text fontSize={["2xl", "3xl"]} textAlign="center">
                  Edit your article
                </Text>
                <Text
                  fontSize={["sm", "md"]}
                  textAlign="center"
                  color="blue.500"
                >
                  writing as {`@${currentUser.email.split("@")[0]}`}
                </Text>

                <Textarea
                  variant="unstyled"
                  placeholder="Title"
                  defaultValue={el.content.title}
                  fontSize={["4xl", "5xl"]}
                  mt="10"
                  resize="vertical"
                  rows={1}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  variant="unstyled"
                  placeholder="Subtitle"
                  defaultValue={el.content.subtitle}
                  fontSize={["xl", "2xl"]}
                  resize="vertical"
                  rows={1}
                  onChange={(e) => setSubtitle(e.target.value)}
                />

                <Divider my={[6, 10]} />

                <Textarea
                  variant="unstyled"
                  placeholder="Write your story here"
                  defaultValue={el.content.articleContent}
                  fontSize={["md", "lg"]}
                  resize="vertical"
                  onChange={(e) => setArticleContent(e.target.value)}
                  rows={8}
                />

                {/* ///////////////////// */}

                <Divider my={[6, 10]} />

                <Box d="flex" flexDirection="column">
                  <Box
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
                      ? "Your article will not be shared with the community. It will be visible only to you. You can change it later anytime."
                      : "Your article will be shared with the community and anyone could read it. You can change it later anytime."}
                  </Text>
                </Box>

                {/* //////////////////////// */}

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
                    to="/my-articles"
                  >
                    Discard
                  </Button>
                  <Button
                    fontSize={["md", "lg"]}
                    py={8}
                    isFullWidth
                    colorScheme="blue"
                    onClick={handleEdit}
                    isLoading={btnLoading}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            ))}
          </>
        )}
      </Box>
    </Box>
  );
}

export default EditArticle;

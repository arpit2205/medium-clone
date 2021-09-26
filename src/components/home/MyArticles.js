import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  IconButton,
  Spacer,
  Button,
  useToast,
  Badge,
  Select,
} from "@chakra-ui/react";
import {
  StarIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

import { Link } from "react-router-dom";

function MyArticles() {
  const { getMyArticles, deleteArticle } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [docIDs, setDocIDs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectValue, setSelectValue] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState([]);

  const toast = useToast();

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getMyArticles();
      setArticles(data.docs.map((el) => el.data()));
      setFilteredArticles(data.docs.map((el) => el.data()));
      setDocIDs(data.docs.map((el) => el.id));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(fetchArticles, []);

  const handleDelete = async (docID, i) => {
    try {
      await deleteArticle(docID);
      toast({
        title: "Article deleted successfully",
        status: "success",
        duration: 5000,
      });
      fetchArticles();
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to delete article",
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectValue(value);
    if (value === "all") {
      setFilteredArticles(articles);
    } else
      setFilteredArticles(articles.filter((el) => el.visibility === value));
  };

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
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
          <Box mx={["6", "10"]}>
            <Text fontSize={["2xl", "3xl"]}>Articles you have written</Text>

            <Box d="flex" justifyContent="center" alignItems="center">
              <Spacer />

              <Select
                // placeholder="Choose article visibility"
                w={["100%", null, "320px"]}
                mt="8"
                onChange={(e) => handleSelectChange(e)}
                value={selectValue}
              >
                <option value="all">All articles</option>
                <option value="public">Public articles</option>
                <option value="private">Private articles</option>
              </Select>
            </Box>

            <Box
              mt="6"
              mb="10"
              d="flex"
              justifyContent="center"
              flexDirection="column"
            >
              {filteredArticles.map((el, i) => {
                return (
                  <>
                    <Box
                      d="flex"
                      justifyContent="center"
                      flexDirection="column"
                      alignItems="flex-start"
                      as={Link}
                      to={`/article/${el.articleID}`}

                      // boxShadow="md"
                      // p={[6, 8]}
                      //   mb={[4, 6]}
                      // rounded="lg"
                    >
                      {el.visibility === "private" ? (
                        <Badge
                          variant="solid"
                          fontSize={["sm", "sm"]}
                          colorScheme="blue"
                          mb="2"
                        >
                          Private {<LockIcon mb="1" ml="1" />}
                        </Badge>
                      ) : (
                        <Badge
                          variant="solid"
                          fontSize={["sm", "sm"]}
                          colorScheme="green"
                          mb="2"
                        >
                          Public
                        </Badge>
                      )}
                      <Text fontSize={["xl", "2xl"]}>{el.content.title}</Text>
                      <Text fontSize={["lg", "xl"]} opacity="0.5">
                        {el.content.subtitle}
                      </Text>
                      <Box d="flex" mt="4">
                        {el.visibility === "private" ? (
                          ""
                        ) : (
                          <>
                            <Box
                              d="flex"
                              flexDirection="row"
                              alignItems="center"
                              mr="2"
                              // mt={[2, null, 0]}
                            >
                              <Text
                                fontWeight="semibold"
                                color="yellow.500"
                                fontSize={["md", "lg"]}
                              >
                                {el.stars}
                              </Text>
                              <StarIcon
                                color="yellow.500"
                                fontSize={["md", "lg"]}
                                ml="2"
                              />
                            </Box>
                          </>
                        )}
                        <Text fontSize={["md", "lg"]} mr="2" color="blue.500">
                          {el.authorUsername}
                        </Text>
                        <Text
                          fontSize={["md", "lg"]}
                          opacity="0.6"
                          fontWeight="light"
                        >
                          {getDate(el.when).slice(4, 21)}
                        </Text>
                      </Box>
                    </Box>
                    <Box d="flex">
                      <Spacer d={["none", null, "block"]} />
                      {/* {setBtnLoading([...btnLoading, false])} */}

                      <Button
                        mt="4"
                        mr="2"
                        variant="outline"
                        as={Link}
                        rightIcon={<EditIcon />}
                        colorScheme="blue"
                        to={`/edit-article/${el.articleID}`}
                      >
                        Edit
                      </Button>

                      <Button
                        mt="4"
                        rightIcon={<DeleteIcon />}
                        colorScheme="red"
                        variant="outline"
                        onClick={() => {
                          handleDelete(docIDs[i], i);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                    <Divider my="6" />
                  </>
                );
              })}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default MyArticles;

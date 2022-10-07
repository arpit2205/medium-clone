import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { StarIcon, SearchIcon } from "@chakra-ui/icons";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

import { Link } from "react-router-dom";

function SuggestedArticles() {
  const { getAllPublicArticles } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await getAllPublicArticles();
      setArticles(data.docs.map((el) => el.data()));
      setFilteredArticles(data.docs.map((el) => el.data()));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

  const getDate = (timestamp) => {
    const d = new Date(timestamp);
    return d.toString();
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);

    const filteredResults = articles.filter((article) => {
      return article.content.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
    });
    setFilteredArticles(filteredResults);
  };

  return (
    <Box mx={["6", "10"]}>
      <Text fontSize={["2xl", "3xl"]}>Recently posted articles</Text>

      <Box my={[4, null, null, 8]}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
            mt="4px"
            ml="4px"
          />
          <Input
            type="text"
            placeholder="Search for articles"
            height={"48px"}
            onChange={(e) => handleSearch(e)}
          />
        </InputGroup>
      </Box>

      {loading ? (
        <LoadingSmall />
      ) : (
        <Box
          mt="10"
          mb={[0, 0, 4]}
          d="flex"
          justifyContent="center"
          flexDirection="column"
        >
          {filteredArticles.length === 0 ? (
            <Text fontSize="xl" textAlign="center">
              No articles found
            </Text>
          ) : null}
          {filteredArticles.map((el) => (
            <Box
              d="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="flex-start"
              as={Link}
              to={`/article/${el.articleID}`}
              // boxShadow="md"
              // p={[6, 8]}
              // mb={[4, 6]}
              // rounded="lg"
            >
              <Text fontSize={["xl", "2xl"]}>{el.content.title}</Text>
              <Text fontSize={["lg", "xl"]} opacity="0.8">
                {el.content.subtitle}
              </Text>
              <Box d="flex" mt="4">
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
                  <StarIcon color="yellow.500" fontSize={["md", "lg"]} ml="2" />
                </Box>
                <Text fontSize={["md", "lg"]} mr="2" color="blue.500">
                  {el.authorUsername}
                </Text>
                <Text fontSize={["md", "lg"]} opacity="0.6" fontWeight="light">
                  {getDate(el.when).slice(4, 21)}
                </Text>
              </Box>

              <Divider my="6" />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default SuggestedArticles;

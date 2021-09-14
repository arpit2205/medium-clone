import React, { useState, useEffect } from "react";
import { Box, Text, Divider } from "@chakra-ui/react";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

import { Link } from "react-router-dom";

function SuggestedArticles() {
  const { getMyArticles } = useFirebase();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await getMyArticles();
      setArticles(data.docs.map((el) => el.data()));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  }, []);

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
        <Box mx={["6", "10"]}>
          <Text fontSize={["2xl", "3xl"]}>Articles you have written</Text>

          <Box my="10" d="flex" justifyContent="center" flexDirection="column">
            {articles.map((el) => (
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
                <Text fontSize={["xl", "2xl"]}>{el.content.title}</Text>
                <Text fontSize={["lg", "xl"]} opacity="0.5">
                  {el.content.subtitle}
                </Text>
                <Box d="flex" mt="4">
                  <Text fontSize={["md", "lg"]} mr="2" color="blue.500">
                    {el.authorUsername}
                  </Text>
                  <Text
                    fontSize={["md", "lg"]}
                    opacity="0.6"
                    fontWeight="light"
                  >
                    {getDate(el.when)}
                  </Text>
                </Box>
                <Divider my="6" />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default SuggestedArticles;

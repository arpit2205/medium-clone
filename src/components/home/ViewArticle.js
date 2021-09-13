import React, { useState, useEffect } from "react";
import { Box, Text, Divider, IconButton, useToast } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Nav from "../layout/Nav";
import LoadingSmall from "../layout/LoadingSmall";

import { useFirebase } from "../../contexts/FirebaseContext";

function ViewArticle() {
  const articleIDFromURL = window.location.href.split("/").pop();
  const { getSpecificArticle } = useFirebase();
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await getSpecificArticle(articleIDFromURL);
      setArticle(data.docs.map((el) => el.data()));
    } catch (err) {
      console.log(err);
      toast({
        title: "The article you are looking for was not found",
        status: "error",
        duration: 5000,
      });
    }

    setLoading(false);
  }, []);

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

              <Box d="flex" mt="4">
                <Text color="blue.500" fontSize={["xl", "2xl"]} mr="4">
                  {el.authorUsername}
                </Text>
                <Text opacity="0.5" fontSize={["xl", "2xl"]}>
                  {el.when}
                </Text>
              </Box>

              <Divider my="6" />

              <Text fontSize={["lg", "xl"]}>{el.content.articleContent}</Text>

              {/* <IconButton colorScheme="" icon={<StarIcon />} /> */}
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

export default ViewArticle;

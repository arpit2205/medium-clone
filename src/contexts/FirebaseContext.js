import React, { useState, useEffect, useContext, createContext } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

const FirebaseContext = createContext();

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

export const FirebaseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const postArticle = (data) => {
    return database.collection("articles").add(data);
  };

  const getAllArticles = () => {
    return database.collection("articles").get();
  };

  const getMyArticles = () => {
    return database
      .collection("articles")
      .where("authorID", "==", currentUser.uid)
      .get();
  };

  const getSpecificArticle = (articleID) => {
    return database
      .collection("articles")
      .where("articleID", "==", articleID)
      .get();
  };

  // const addToDatabase = (data) => {
  //   return database.collection("sample").add(data);
  // };

  // const readFromDatabase = () => {
  //   return database
  //     .collection("sample")
  //     .where("id", "==", currentUser.uid)
  //     .get();
  // };

  const value = {
    postArticle,
    getAllArticles,
    getMyArticles,
    getSpecificArticle,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

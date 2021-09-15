import React, { useState, useEffect, useContext, createContext } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";
import firebase from "firebase";

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
    return database.collection("articles").orderBy("when", "desc").get();
  };

  const getMyArticles = () => {
    return database
      .collection("articles")
      .where("authorID", "==", currentUser.uid)
      .orderBy("when", "desc")
      .get();
  };

  const getSpecificArticle = (articleID) => {
    return database
      .collection("articles")
      .where("articleID", "==", articleID)
      .get();
  };

  const giveAStar = (docID) => {
    return database
      .collection("articles")
      .doc(docID)
      .update({ stars: firebase.firestore.FieldValue.increment(1) });
  };

  const postComment = (data) => {
    return database.collection("comments").add(data);
  };

  const getComments = (articleID) => {
    return database
      .collection("comments")
      .where("articleID", "==", articleID)
      .orderBy("when")
      .get();
  };

  const deleteArticle = (docID) => {
    return database.collection("articles").doc(docID).delete();
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
    giveAStar,
    postComment,
    getComments,
    deleteArticle,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

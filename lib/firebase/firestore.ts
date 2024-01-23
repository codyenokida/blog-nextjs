/**
 * Helper Firestore APIs
 */
import { cache } from "react";

import {
  getDocs,
  collection,
  query,
  where,
  doc,
  updateDoc,
  arrayUnion,
  orderBy,
  Query,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

/**
 *
 * @param {Query} q Query
 * @param param1
 * @returns
 */
function applyQueryFilters(
  q: Query,
  { id, category, order = "desc" }: FirestoreQuery
) {
  if (id) {
    q = query(q, where("id", "==", id));
  }
  if (category) {
    q = query(q, where("category", "==", category));
  }
  if (order) {
    q = query(q, orderBy("datePosted", order));
  }
  return q;
}

/**
 * Function to get post items (simplifed)
 *
 * @param {FirestoreQuery} q Query
 * @returns
 */
export async function getPostItems(q: FirestoreQuery = {}) {
  let queryRef = query(collection(db, "posts"));
  queryRef = applyQueryFilters(queryRef, q);
  const collectionSnap = await getDocs(queryRef);
  const collectionArray = collectionSnap?.docs?.map((doc) => doc.data());
  if (collectionArray === undefined || collectionArray === null) {
    return [];
  }
  if (collectionArray && collectionArray.length)
    return collectionArray as BlogPostItem[];
}

/**
 * Helper function to retrive a post given an ID
 *
 * @param {string} postId ID of the post you want to retrieve
 * @returns
 */
export async function getPostFromId(postId: string) {
  let queryRef = query(collection(db, "blog-post"));
  queryRef = applyQueryFilters(queryRef, { id: postId });
  const collectionSnap = await getDocs(queryRef);
  const collectionArray = collectionSnap?.docs?.map((doc) => doc.data());
  if (collectionArray && collectionArray.length)
    return collectionArray[0] as BlogPostData;
}

/**
 * Helper function to retrive a post given an ID
 *
 * @param {FirestoreQuery} q Query
 * @returns
 */
export async function getPosts(q: FirestoreQuery = {}) {
  let queryRef = query(collection(db, "blog-post"));
  queryRef = applyQueryFilters(queryRef, q);
  const collectionSnap = await getDocs(queryRef);
  const collectionArray = collectionSnap?.docs?.map((doc) =>
    doc.data()
  ) as BlogPostData[];
  return collectionArray || [];
}

/**
 * Function to post a comment given and ID, author, and content
 *
 * @param {string} id
 * @param {string} author
 * @param {string} content
 */
export async function postComment(id: string, author: string, content: string) {
  if (!author) {
    throw "Comment needs an Author.";
  }
  if (!content) {
    throw "Comment needs content";
  }
  if (!id) {
    ("Error: No post id");
  }
  const postRef = doc(db, "blog-post", id);
  const datePosted = new Date().toLocaleDateString();
  // Atomically add a new comment to the "comments" array field.
  await updateDoc(postRef, {
    comments: arrayUnion({
      author,
      content,
      datePosted,
    }),
  });
}

export async function uploadPost(
  id: string,
  thumbnail: string | undefined,
  post: any
) {
  const blogPostItemRef = doc(db, "posts", `${id}`);
  const blogPostContentRef = doc(db, "blog-post", `${id}`);
  const item = {
    id: post.id,
    datePosted: post.datePosted,
    title: post.title,
    category: post.category,
    thumbnail: thumbnail,
  };
  setDoc(blogPostItemRef, { ...item }, { merge: true });
  setDoc(blogPostContentRef, { ...post }, { merge: true });
}

// Helpers for migration

export async function migratePosts() {
  const posts = await getPosts();
  for (const post of posts) {
    const blogPostRef = doc(db, "posts", `${post.id}`);
    const item = {
      id: post.id,
      datePosted: post.datePosted,
      title: post.title,
      category: post.category,
      // thumbnail: post.thumbnailImage,
    };
    setDoc(blogPostRef, { ...item }, { merge: true });
  }
}

export const getPostItemsCached = cache(getPostItems);
export const getPostFromIdCached = cache(getPostFromId);

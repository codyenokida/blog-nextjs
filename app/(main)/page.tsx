"use client";

import { useContext } from "react";

import Post from "@/components/Post";
import { PostContext } from "@/context/PostContext";

import styles from "./page.module.scss";

export const revalidate = 1800; // revalidate data at most every half hour

export default function Page() {
  const { activePostId } = useContext(PostContext);

  return (
    <div className={styles.home}>
      <Post postId={activePostId} />
    </div>
  );
}

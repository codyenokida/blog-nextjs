"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import Button from "@/components/Button";
import PostContent from "@/components/PostContent";
import PostComment from "@/components/PostComment";
import SpotifyPill from "@/components/SpotifyPill";
import PostLoadingSkeleton from "@/components/Skeleton/PostLoadingSkeleton";
import Footer from "@/components/Footer";

import { PostContext } from "@/context/PostContext";

import { getPostFromIdCached } from "@/lib/firebase/firestore";

import styles from "./Post.module.scss";

export default function Post({
  postId,
  page = false,
}: {
  postId: string;
  page?: boolean;
}) {
  const { setActivePostId } = useContext(PostContext);

  const [data, setData] = useState<BlogPostData>({} as BlogPostData);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // Fetch individual blog post
  useEffect(() => {
    setDataLoading(true);
    const getData = async () => {
      const post = await getPostFromIdCached(postId);
      if (post) {
        setData(post);
        setActivePostId(post.id);
      }
      setDataLoading(false);
    };

    setTimeout(() => {
      if (postId) getData();
    }, 500);
  }, [postId, setActivePostId]);

  // Whenever context changes

  const {
    spotifyLink: spotifyEmbedLink,
    title,
    dateType,
    startDate,
    endDate,
    datePosted,
    content,
    comments,
  } = data;

  const formattedStartDate = startDate
    ? startDate?.toDate()?.toLocaleDateString()
    : "";
  const formattedEndDate = endDate
    ? endDate?.toDate()?.toLocaleDateString()
    : "";
  const formattedDatePosted = datePosted
    ? datePosted?.toDate()?.toLocaleDateString()
    : "";

  if (!content || dataLoading) {
    return (
      <article className={classNames(styles.main, "main")}>
        <Link href="/" passHref className={styles.backToHome}>
          <Button text="← Back to Home" />
        </Link>
        <PostLoadingSkeleton />
      </article>
    );
  }

  return (
    <article className={classNames(styles.main, "main", { page: page })}>
      <Link href="/" passHref className={styles.backToHome}>
        <Button text="← Back to Home" />
      </Link>
      {spotifyEmbedLink && <SpotifyPill spotifyEmbedLink={spotifyEmbedLink} />}
      <header className={styles.title}>
        <h1 className={styles.title}>{title || ""}</h1>
        {dateType === "single" && (
          <p className={styles.date}>{formattedStartDate}</p>
        )}
        {dateType === "multiple" && (
          <p className={styles.date}>
            {formattedStartDate} - {formattedEndDate}
          </p>
        )}
      </header>
      <PostContent content={content} />
      <p className={styles.datePosted}>Date Posted: {formattedDatePosted}</p>
      <PostComment comments={comments} postId={postId} />
      <Footer />
    </article>
  );
}

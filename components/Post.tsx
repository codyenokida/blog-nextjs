"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

import { getPostFromIdCached } from "@/lib/firebase/firestore";

import Button from "./Button";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import SpotifyPill from "./SpotifyPill";

import styles from "./Post.module.scss";
import PostLoadingSkeleton from "./Skeleton/PostLoadingSkeleton";
import Footer from "./Footer";

export default function Post({ postId }: { postId: string }) {
  const [data, setData] = useState<BlogPostData>({} as BlogPostData);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // Fetch individual blog post
  useEffect(() => {
    setDataLoading(true);
    const getData = async () => {
      const post = await getPostFromIdCached(postId);
      if (post) setData(post);
      setDataLoading(false);
    };

    setTimeout(() => {
      if (postId) getData();
    }, 500);
  }, [postId]);

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
    <article className={classNames(styles.main, "main")}>
      <Link href="/" passHref className={styles.backToHome}>
        <Button text="← Back to Home" />
      </Link>
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
      {spotifyEmbedLink && <SpotifyPill spotifyEmbedLink={spotifyEmbedLink} />}
      <PostContent content={content} />
      <p className={styles.datePosted}>Date Posted: {formattedDatePosted}</p>
      <PostComment comments={comments} postId={postId} />
      <Footer />
    </article>
  );
}

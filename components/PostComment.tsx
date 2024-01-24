"use client";

import { useEffect, useState } from "react";

import { postComment } from "@/lib/firebase/firestore";

import styles from "./PostComment.module.scss";

interface CommentProps {
  postId: string;
  comments: Comment[] | undefined;
}

const PostComment = ({ postId, comments: commentsFromData }: CommentProps) => {
  const [localComments, setLocalComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // Commenting states
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (commentsFromData) setLocalComments(commentsFromData);
  }, [commentsFromData]);

  useEffect(() => {
    if (author) setError("");
    if (content) setError("");
    if (!author && !content) setError("");
  }, [author, content]);

  /**
   * Helper function to render comments
   */
  const renderComments = () => {
    if (localComments?.length === 0) {
      return (
        <div className={styles.container}>
          <p>
            0 comments
            <br />
            Nothin to see here.
          </p>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        {localComments.map((comment, i) => {
          return (
            <article
              className={styles.comment}
              key={`${comment.author} ${comment.datePosted} ${i}`}
            >
              <span className={styles.author}>{comment.author}</span>
              <span className={styles.datePosted}>{comment.datePosted}</span>
              <p className={styles.content}>{comment.content}</p>
            </article>
          );
        })}
      </div>
    );
  };

  const handlePostClick = async () => {
    setLoading(true);
    try {
      const datePosted = new Date().toLocaleDateString();
      await postComment(postId, author, content);
      // Locally refresh the comments to render
      setLocalComments([
        ...localComments,
        {
          author: author,
          content: content,
          datePosted,
        } as Comment,
      ]);
      setAuthor("");
      setContent("");
      setError("");
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setError(e);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Comments 💬</h2>
      {renderComments()}
      <div className={styles.post}>
        <div className={styles.input}>
          <label>Your name</label>
          <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className={styles.input}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handlePostClick}>
          Post
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
      {/* <Footer toggleTheme={toggleTheme} /> */}
    </section>
  );
};

export default PostComment;

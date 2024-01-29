"use client";

import { useContext, useEffect, useState } from "react";
import { JetBrains_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import PostItem from "@/components/PostItem";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SortIcon from "@/components/Icons/SortIcon";
import PostItemLoadingSkeleton from "@/components/Skeleton/PostItemLoadingSkeleton";

import { ThemeContext } from "@/context/ThemeContext";
import { PostContext } from "@/context/PostContext";

import { categories } from "@/utils/consts";

import { getPostItems, getPostItemsCached } from "@/lib/firebase/firestore";

import styles from "./HomeLayout.module.scss";

const jetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });

export default function HomeLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  const { theme } = useContext(ThemeContext);
  const { activePostId, setActivePostId } = useContext(PostContext);

  // Category States
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  // Date States
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [postsLoading, setPostsLoading] = useState<boolean>(true);

  // Sorting
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("desc");

  /**
   * On first render, fetch all post items.
   */
  useEffect(() => {
    const getDocument = async () => {
      setPostsLoading(true);
      const data = await getPostItemsCached({ order: "desc" });
      if (data) {
        setPosts(data);
        setActivePostId(data[0].id);
      }
      setPostsLoading(false);
    };

    getDocument();
  }, [setActivePostId]);

  /**
   * Re-fetch data whenever order (sorting) or category is changed
   */
  useEffect(() => {
    const getDocument = async () => {
      const category =
        activeCategoryIndex !== 0 ? categories[activeCategoryIndex] : undefined;
      const data = await getPostItemsCached({ category, order: orderBy });
      if (data) {
        setPosts(data);
        setActivePostId(data[0].id);
      }
    };
    getDocument();
  }, [orderBy, activeCategoryIndex, setPosts, setActivePostId]);

  /**
   * Handler for clicking the "Sort by Date" button
   */
  const handleSortButtonClick = async () => {
    const newOrderBy = orderBy === "asc" ? "desc" : "asc";
    setOrderBy(newOrderBy);
  };

  /**
   * Handler for clicking on a post to display
   *
   * @param id
   */
  const handlePostClick = (id: string) => {
    setActivePostId(id);
  };

  return (
    <body
      suppressHydrationWarning={true}
      className={classNames(styles.body, jetBrains_Mono.className, {
        [theme]: theme === "dark",
      })}
    >
      <Header
        activeCategoryIndex={activeCategoryIndex}
        setActiveCategoryIndex={setActiveCategoryIndex}
      />
      <main className={classNames(styles.content, "content")}>
        <div className={classNames(styles.posts, "posts")}>
          <div className={styles.sort}>
            <button onClick={handleSortButtonClick} className="sortButton">
              Sort by Date
              <SortIcon
                className={classNames(styles.sortIcon, "sortIcon", {
                  [styles.asc]: orderBy === "asc",
                })}
              />
            </button>
          </div>
          {postsLoading ? (
            <PostItemLoadingSkeleton />
          ) : (
            <div className={styles.list}>
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  item={post}
                  handlePostClick={handlePostClick}
                  activePostId={activePostId}
                />
              ))}
            </div>
          )}
        </div>
        <hr className={styles.divider} />
        <div className={styles.post}>{children}</div>
      </main>
      <Footer />
    </body>
  );
}

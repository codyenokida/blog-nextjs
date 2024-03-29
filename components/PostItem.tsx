import Link from "next/link";
import classNames from "classnames";

import styles from "./PostItem.module.scss";
import Image from "next/image";

interface PostItemProps {
  item: BlogPostItem;
  handlePostClick: (id: string) => void;
  activePostId: string;
}

export default function PostItem({
  item,
  handlePostClick,
  activePostId,
}: PostItemProps) {
  return (
    <>
      <Link
        className={styles.item}
        key={item.title + " mobile"}
        href={`/post/${item.id}`}
        onClick={() => handlePostClick(item.id)}
      >
        <div className={styles.image}>
          <Image
            src={item.thumbnail}
            alt={`${item.title} thumbnail`}
            width={40}
            height={40}
          />
        </div>
        <div className={styles.title}>
          <h2>{item.title}</h2>
          <span>Read here ↦</span>
        </div>
      </Link>
      <Link
        href={`/post/${item.id}`}
        className={classNames(styles.link, {
          [styles.active]: item.id === activePostId,
        })}
        onClick={() => handlePostClick(item.id)}
        key={item.title}
      >
        {item.title}
      </Link>
    </>
  );
}

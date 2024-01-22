import styles from "./PostLoadingSkeleton.module.scss";

export default function PostLoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.skeleton} />
      </div>
      <div className={styles.datePosted}>
        <div className={styles.skeleton} />
      </div>
      <div className={styles.spotify}>
        <div className={styles.skeleton} />
      </div>
      <div className={styles.content}>
        <div className={styles.skeleton} />
      </div>
      {[
        "content1",
        "content2",
        "content3",
        "content4",
        "content5",
        "content6",
        "content7",
        "content8",
      ].map((content) => (
        <div className={styles[content]} key={content}>
          <div className={styles.skeleton} />
        </div>
      ))}
    </div>
  );
}

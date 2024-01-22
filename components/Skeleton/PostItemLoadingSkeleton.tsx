import classNames from "classnames";
import styles from "./PostItemLoadingSkeleton.module.scss";

export default function PostItemLoadingSkeleton() {
  return (
    <>
      <div className={styles.container}>
        {Array(6)
          .fill("")
          .map((content: string, i) => (
            <div
              className={classNames(styles[`content${i}`], styles.content)}
              key={`${i} ${content}`}
            >
              <div className={styles.skeleton} />
            </div>
          ))}
      </div>
      <div className={styles.mobile}>
        {Array(6)
          .fill("")
          .map((content: string, i) => (
            <div
              className={classNames(styles[`content${i}`], styles.content)}
              key={`${i} ${content}`}
            >
              <div className={styles.image}>
                <div className={styles.skeleton} />
              </div>
              <div className={styles.text}>
                <div className={styles.title}>
                  <div className={styles.skeleton} />
                </div>
                <div className={styles.readMore}>
                  <div className={styles.skeleton} />
                </div>
              </div>
              <div className={styles.skeleton} />
            </div>
          ))}
      </div>
    </>
  );
}

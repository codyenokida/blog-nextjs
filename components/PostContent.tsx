import classNames from "classnames";

import styles from "./PostContent.module.scss";

interface ContentProps {
  content: Content[];
}

export default function PostContent({ content }: ContentProps) {
  return (
    <div className={classNames(styles.content, "content")}>
      {content?.map((section, i) => {
        if (section.type === "text") {
          return (
            <p className={styles.text} key={`Section text ${i}`}>
              {section.text}
            </p>
          );
        } else {
          return (
            <div className={styles.image} key={`Section Image Container ${i}`}>
              <img src={section.imageUrl} alt={`Section ${i}`} />
              {section.imageCaption && (
                <figcaption>{section.imageCaption}</figcaption>
              )}
            </div>
          );
        }
      })}
    </div>
  );
}

import React from "react";
import { Reorder } from "framer-motion";

import styles from "./ReorderItem.module.scss";

interface ReorderItemProps {
  type: "text" | "image";
  value: any;
  index: number;
  caption?: "string";
  handleRemoveContent: (index: number) => void;
  handleEditContent?: () => {};
}

const ReorderItem = ({
  type,
  value,
  index,
  handleRemoveContent,
  handleEditContent,
}: ReorderItemProps) => {
  const text = value.text;

  if (type === "text" && text) {
    return (
      <Reorder.Item key={value.id} value={value} className={styles.item}>
        {text}
        <button
          className={styles.delete}
          onClick={() => handleRemoveContent(index)}
        >
          x
        </button>
      </Reorder.Item>
    );
  } else if (type === "image") {
    return (
      <Reorder.Item key={value.id} value={value} className={styles.item}>
        <div>
          <img
            src={
              value.imageUrl
                ? value.imageUrl
                : URL.createObjectURL(value.tempImage)
            }
            alt="item temporary"
          />
          <br />
          {value.imageCaption && <span>{value.imageCaption}</span>}
        </div>
        <button
          className={styles.delete}
          onClick={() => handleRemoveContent(index)}
        >
          x
        </button>
      </Reorder.Item>
    );
  }
};

export default ReorderItem;

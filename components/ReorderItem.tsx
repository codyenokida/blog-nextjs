import React, { useState, useRef, useEffect } from "react";
import { Reorder } from "framer-motion";

import styles from "./ReorderItem.module.scss";

interface ReorderItemProps {
  type: "text" | "image";
  key: string;
  value: any;
  index: number;
  caption?: "string";
  handleRemoveContent: (index: number) => void;
  handleEditContent?: () => {};
}

const ReorderItem = ({
  type,
  key,
  value,
  index,
  handleRemoveContent,
  handleEditContent,
}: ReorderItemProps) => {
  const text = value.text;

  if (type === "text" && text) {
    return (
      <Reorder.Item key={key} value={value} className={styles.item}>
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
      <Reorder.Item key={key} value={value} className={styles.item}>
        <div>
          <img
            src={
              value.image ? value.image : URL.createObjectURL(value.tempImage)
            }
            alt="item temporary"
          />
          {value.caption && <span>{value.caption}</span>}
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

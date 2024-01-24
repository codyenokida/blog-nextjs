import React from "react";

import styles from "./SplitText.module.scss";

interface SplitTextProps {
  children: string;
  delay?: number;
}

const SplitText = ({ children, delay = 20 }: SplitTextProps) => {
  return (
    <span className={styles.span}>
      {children.split("").map(function (char, index) {
        let style = { animationDelay: 0.1 + index / delay + "s" };
        return (
          <span aria-hidden="true" key={index} style={style}>
            {char}
          </span>
        );
      })}
    </span>
  );
};

export default SplitText;

import { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import styles from "./CategoryButton.module.scss";

interface CategoryButtonProps {
  category: string;
  index: number;
  activeCategoryIndex: number;
  setActiveCategoryIndex: Dispatch<SetStateAction<number>>;
}

const CategoryButton = ({
  category,
  index,
  activeCategoryIndex,
  setActiveCategoryIndex,
}: CategoryButtonProps) => {
  return (
    <button
      key={category}
      className={classNames(styles.button, {
        [styles.active]: activeCategoryIndex === index,
        active: activeCategoryIndex === index,
      })}
      style={{ animationDelay: 0.25 + index / 20 + "s" }}
      onClick={() => setActiveCategoryIndex(index)}
    >
      {category}
    </button>
  );
};

export default CategoryButton;

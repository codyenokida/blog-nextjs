import Image from "next/image";
import classNames from "classnames";

import SplitText from "@/components/SplitText";
import CategoryButton from "@/components/CategoryButton";

import { categoriesForRender } from "@/utils/consts";

import styles from "./Header.module.scss";

export default function Header({
  activeCategoryIndex,
  setActiveCategoryIndex,
}: any) {
  return (
    <header className={classNames(styles.title, "title")}>
      <div>
        <Image
          src="/logo512.png"
          alt="Kota Cody Enokida Logo"
          className={styles.logo}
          width={48}
          height={48}
          priority
        />
        <h1>
          <SplitText>A Blog by Kota Cody Enokida</SplitText>
        </h1>
      </div>
      <p>
        <SplitText delay={60}>
          Unfiltered thoughts and experiences of my day to
          day.「榎田岬田の人生観」
        </SplitText>
      </p>
      {/* Category Container */}
      <div className={styles.category}>
        {categoriesForRender.map((category, i) => (
          <CategoryButton
            key={category}
            category={category}
            index={i}
            activeCategoryIndex={activeCategoryIndex}
            setActiveCategoryIndex={setActiveCategoryIndex}
          />
        ))}
      </div>
    </header>
  );
}

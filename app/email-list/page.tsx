import Link from "next/link";

import styles from "./page.module.scss";

const Error = () => {
  return (
    <main className={styles.container}>
      <h1>Oops!</h1>
      <p>You've reached somewhere you aren't supposed to be.</p>
      <Link href="/">Go back!!</Link>
    </main>
  );
};

export default Error;

"use client";

import Link from "next/link";
import { JetBrains_Mono } from "next/font/google";
import classNames from "classnames";

import "@/styles/globals.scss";
import styles from "./not-found.module.scss";

const jetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <main className={classNames(styles.container, jetBrains_Mono.className)}>
      <h1>Oops!</h1>
      <p>You have reached somewhere you are not supposed to be.</p>
      <Link href="/">Go back!!</Link>
    </main>
  );
}

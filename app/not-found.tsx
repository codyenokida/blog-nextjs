"use client";

import Link from "next/link";

const jetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });

import styles from "./not-found.module.scss";
import "@/styles/globals.scss";
import { JetBrains_Mono } from "next/font/google";

export default function NotFound() {
  return (
    <main className={styles.container}>
      <h1>Oops!</h1>
      <p>You have reached somewhere you are not supposed to be.</p>
      <Link href="/">Go back!!</Link>
    </main>
  );
}

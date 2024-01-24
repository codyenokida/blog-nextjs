import React, { useContext } from "react";
import classNames from "classnames";
import Link from "next/link";

import LightSwitch from "@/components/Icons/LightSwitch";

import { ThemeContext } from "@/context/ThemeContext";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <footer className={styles.footer}>
      <div>
        <p>
          Made by Kota Cody Enokida using{" "}
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NextJS 👨‍💻
          </a>
          &nbsp;&&nbsp;
          <a
            href="https://firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Firebase 🔥
          </a>
        </p>
        <p>
          Want to get notified on each post?{" "}
          <Link href="/email-list">Sign up here!</Link>
        </p>
      </div>

      <button
        className={classNames("lights", styles.lights)}
        onClick={toggleTheme}
      >
        <LightSwitch theme={theme} />
      </button>
    </footer>
  );
}

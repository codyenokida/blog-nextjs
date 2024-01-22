import styles from "./Button.module.scss";

interface ButtonProps {
  text: string;
  onClick?: any;
}

export default function Button({ text }: ButtonProps) {
  return <button className={styles.button}>{text}</button>;
}

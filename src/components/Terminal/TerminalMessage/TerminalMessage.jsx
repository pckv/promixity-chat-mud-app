import styles from "./TerminalMessage.module.css";

export const TerminalMessage = (props) => (
  <div
    style={{
      ...(props.color && {
        "--message-color": props.color,
      }),
    }}
    class={styles.Message}
  >
    {props.message}
  </div>
);

import styles from "./TerminalInput.module.css";

export const TerminalInput = (props) => (
  <div class={styles.Input}>
    <textarea
      class={styles.Input}
      rows={1}
      placeholder="Type a command..."
      onInput={(e) => {
        // Auto resize the textarea
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      onKeyPress={(e) => {
        // Make enter key submit the command
        if (e.key === "Enter") {
          e.preventDefault();
          const value = e.target.value;
          e.target.value = "";
          e.target.style.height = "auto";
          props.onSend?.(value);
        }
      }}
    />
  </div>
);

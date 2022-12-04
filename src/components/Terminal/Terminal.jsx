import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import styles from "./Terminal.module.css";

export const Terminal = () => {
  const [messages, setMessages] = createStore([]);
  let messagesRef;

  const addMessage = (message) => {
    const isAtBottom =
      messagesRef.scrollHeight - messagesRef.scrollTop ===
      messagesRef.clientHeight;

    setMessages(
      produce((messages) => {
        messages.push(message);
      })
    );

    // Scroll to bottom if the user is already at the bottom
    if (isAtBottom) {
      messagesRef.scrollTop = messagesRef.scrollHeight;
    }
  };

  return (
    <div class={styles.Terminal}>
      <div class={styles.Messages} ref={messagesRef}>
        <For each={messages}>
          {(message) => <div class={styles.Message}>{message}</div>}
        </For>
      </div>
      <div class={styles.Input}>
        <textarea
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
              addMessage(" > " + value);
            }
          }}
        />
      </div>
    </div>
  );
};

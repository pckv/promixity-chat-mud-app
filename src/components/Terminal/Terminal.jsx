import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import styles from "./Terminal.module.css";
import { TerminalInput } from "./TerminalInput/TerminalInput";

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

  const ws = new WebSocket("ws://localhost:8080");
  ws.onmessage = (event) => {
    addMessage(event.data);
  };

  const onMessageSend = (text) => {
    addMessage(" > " + text);
    ws.send(text);
  };

  return (
    <div class={styles.Terminal}>
      <div class={styles.Messages} ref={messagesRef}>
        <For each={messages}>
          {(message) => <div class={styles.Message}>{message}</div>}
        </For>
      </div>
      <TerminalInput onSend={onMessageSend} />
    </div>
  );
};

import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { createWebSocket } from "../../ws";
import styles from "./Terminal.module.css";
import { TerminalInput } from "./TerminalInput/TerminalInput";

export const Terminal = () => {
  const [messages, setMessages] = createStore(["Connecting..."]);
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

  const { send } = createWebSocket({
    url: "ws://localhost:8080",
    onMessage: (event) => addMessage(event.data),
    onClose: () => addMessage("Connection closed"),
    onReconnect: () => addMessage("Reconnecting..."),
  });

  const onMessageSend = (text) => {
    addMessage(" > " + text);
    send(text);
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

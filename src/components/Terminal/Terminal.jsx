import { For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { colors } from "../../colors";
import { createWebSocket } from "../../ws";
import styles from "./Terminal.module.css";
import { TerminalInput } from "./TerminalInput/TerminalInput";
import { TerminalMessage } from "./TerminalMessage/TerminalMessage";

export const Terminal = () => {
  const [messages, setMessages] = createStore([
    createSystemMessage("Connecting to server..."),
  ]);
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
    onMessage: (event) => addMessage(createMessage(event.data)),
    onClose: () => addMessage(createErrorMessage("Connection closed")),
    onReconnect: () => addMessage(createSystemMessage("Reconnecting...")),
  });

  const onMessageSend = (text) => {
    addMessage(createMessage(" > " + text));
    try {
      send(text);
    } catch (e) {}
  };

  return (
    <div class={styles.Terminal}>
      <div class={styles.Messages} ref={messagesRef}>
        <For each={messages}>
          {(message) => <TerminalMessage {...message} />}
        </For>
      </div>
      <TerminalInput onSend={onMessageSend} />
    </div>
  );
};

const createMessage = (text) => ({
  message: text,
  color: colors.primary,
});

const createSystemMessage = (text) => ({
  message: text,
  color: colors.secondary,
});

const createErrorMessage = (text) => ({
  message: text,
  color: colors.error,
});

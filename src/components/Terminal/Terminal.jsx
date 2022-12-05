import { createSignal, For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { createWebSocket } from "../../ws";
import styles from "./Terminal.module.css";
import { TerminalInput } from "./TerminalInput/TerminalInput";
import { TerminalMessage } from "./TerminalMessage/TerminalMessage";

export const Terminal = () => {
  const [messages, setMessages] = createStore(["&aConnecting to server..."]);
  let messagesRef;

  const [palette, setPalette] = createSignal({
    light: "#fff",
    accent: "#888",
    dark: "#444",
    background: "#080808",
  });

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
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      if (data.message) {
        addMessage(data.message);
      }
      if (data.palette) {
        setPalette({
          light: data.palette.light || palette().light,
          accent: data.palette.accent || palette().accent,
          dark: data.palette.dark || palette().dark,
          background: data.palette.background || palette().background,
        });
      }
    },
    onClose: () => addMessage("&aConnection closed"),
    onReconnect: () => addMessage("&aReconnecting..."),
  });

  const onMessageSend = (text) => {
    addMessage("> " + text);
    try {
      send(text);
    } catch (e) {}
  };

  return (
    <div
      class={styles.Terminal}
      style={{
        "--light": palette().light,
        "--accent": palette().accent,
        "--dark": palette().dark,
        "--background": palette().background,
      }}
    >
      <div class={styles.Messages} ref={messagesRef}>
        <For each={messages}>
          {(message) => <TerminalMessage message={message} />}
        </For>
      </div>
      <TerminalInput onSend={onMessageSend} />
    </div>
  );
};

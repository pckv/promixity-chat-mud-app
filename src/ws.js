import { createSignal } from "solid-js";

export const createWebSocket = ({
  url,
  onMessage,
  onOpen,
  onClose,
  onReconnect,
  onError,
}) => {
  const [ws, setWs] = createSignal(null);

  const newWebSocket = () => {
    const newWs = new WebSocket(url);
    newWs.onmessage = onMessage;
    newWs.onopen = onOpen;
    newWs.onerror = onError;
    newWs.onclose = () => {
      onClose?.();
      setTimeout(() => {
        newWebSocket();
        newWs.close();
        onReconnect?.();
      }, 2000);
    };
    setWs(newWs);
  };

  newWebSocket();

  return {
    send: (data) => ws().send(data),
    disconnect: () => ws().close(),
  };
};

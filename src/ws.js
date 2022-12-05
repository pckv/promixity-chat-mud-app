import { createSignal } from "solid-js";

export const createWebSocket = (props) => {
  const [ws, setWs] = createSignal(null);

  const newWebSocket = () => {
    const newWs = new WebSocket(props.url);
    newWs.onmessage = props.onMessage;
    newWs.onopen = props.onOpen;
    newWs.onerror = props.onError;
    newWs.onclose = () => {
      props.onClose?.();
      setTimeout(() => {
        newWebSocket();
        newWs.close();
        props.onReconnect?.();
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

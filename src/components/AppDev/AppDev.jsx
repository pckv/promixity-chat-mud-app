import { createUniqueId, For } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { Terminal } from "../Terminal/Terminal";
import styles from "./AppDev.module.css";

export const AppDev = () => {
  const [terminals, setTerminals] = createStore([]);

  const addTerminal = () => {
    setTerminals(produce((terminals) => terminals.push(createUniqueId())));
  };

  const removeTerminal = (id) => {
    setTerminals(
      produce((terminals) => terminals.splice(terminals.indexOf(id), 1))
    );
  };

  addTerminal();

  return (
    <div class={styles.App}>
      <div class={styles.TerminalsContainer}>
        <For each={terminals}>
          {(id) => <Terminal onExit={() => removeTerminal(id)} />}
        </For>
      </div>
      <a onClick={addTerminal} class={styles.AddButton}>
        +
      </a>
    </div>
  );
};

import styles from "./TerminalMessage.module.css";

export const TerminalMessage = (props) => (
  <div class={styles.Message}>
    <FormattedMessage message={props.message} />
  </div>
);

const colorModifiers = {
  "&l": "TextLight",
  "&a": "TextAccent",
  "&d": "TextDark",
};

const styleModifiers = {
  "&b": "TextBold",
  "&i": "TextItalic",
  "&u": "TextUnderline",
  "&s": "TextStrikethrough",
  "&f": "TextFlash",
  "&x": "TextInvert",
  "&q": "TextQuake",
};

const modifierPattern = /(&\/?[a-z])/g;

/// Example:
///
/// &aConnecting to &bserver&/b... &lHold on
///
/// parts = ["&a", "Connecting to ", "&b", "server", "&/b", "... ", "&l", "Hold on"]
///
/// <span accent>Connecting to </span>
/// <span accent bold>server</span>
/// <span accent>... </span>
/// <span light>Hold on</span>
const FormattedMessage = (props) => {
  // Find all the modifiers in the message
  const parts = props.message.split(modifierPattern).filter(Boolean);

  // Add default color to the first part if a color modifier is not present
  if (!colorModifiers[parts[0]]) {
    parts.unshift("&l");
  }

  const spans = [];
  let colorClass = null;
  const styleClasses = [];

  for (const part of parts) {
    // If the part is a color modifier, use it as the new color class
    if (colorModifiers[part]) {
      colorClass = colorModifiers[part];
      // If the part is a style modifier, apply it to the style classes
    } else if (styleModifiers[part]) {
      styleClasses.push(styleModifiers[part]);
      // If the part is a closing style modifier, remove it from the style classes
    } else if (part.startsWith("&/")) {
      const styleModifier = `&${part.slice(2)}`;
      if (styleModifiers[styleModifier]) {
        styleClasses.splice(
          styleClasses.indexOf(styleModifiers[styleModifier]),
          1
        );
      }
    } else {
      // If the part is not a modifier, add it to the spans
      const element = (
        <span class={[colorClass, ...styleClasses].join(" ")}>{part}</span>
      );
      if (styleClasses.includes("TextQuake")) {
        spans.push(
          <span class="MotionParent">
            {part}
            {element}
          </span>
        );
      } else {
        spans.push(element);
      }
    }
  }

  return <>{spans}</>;
};

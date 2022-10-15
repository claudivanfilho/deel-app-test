import useAutocomplete from "../../hooks/useAutocomplete";
import DOMPurify from "dompurify";

export default function OptionsList({ onBlur }: { onBlur: () => void }) {
  const { options, text, setText } = useAutocomplete();
  const onChangeOpt = (opt: string) => {
    setText(opt);
    onBlur();
  };

  return (
    <ul className="autocomplete__options-list" data-testid="options-list">
      {options.map((opt) => (
        <li
          aria-label={opt}
          tabIndex={0}
          className="autocomplete__option-item"
          key={opt}
          onClick={() => onChangeOpt(opt)}
          onKeyDown={(evt) => evt.key === "Enter" && onChangeOpt(opt)}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(opt.replace(new RegExp(text, "ig"), `<mark>${text}</mark>`)),
          }}
        />
      ))}
    </ul>
  );
}

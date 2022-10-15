import useAutocomplete from "../../hooks/useAutocomplete";
import DOMPurify from "dompurify";

export default function OptionsList({ onBlur }: { onBlur: () => void }) {
  const { options, text, setText } = useAutocomplete();

  return (
    <ul className="autocomplete__options-list" data-testid="options-list">
      {options.map((opt) => (
        <li
          aria-label={opt}
          tabIndex={0}
          className="autocomplete__option-item"
          key={opt}
          onClick={() => {
            setText(opt);
            onBlur();
          }}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(opt.replace(new RegExp(text, "ig"), `<mark>${text}</mark>`)),
          }}
        />
      ))}
    </ul>
  );
}

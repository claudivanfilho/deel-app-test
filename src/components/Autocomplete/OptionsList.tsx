import { useRef } from "react";
import { useOutsideAlerter } from "../../hooks/useOutside";

interface OptionsListType {
  text: string;
  onChange: (text: string) => Promise<void>;
  options: string[];
  onBlur: () => void;
}

export default function OptionsList({ options, text, onChange, onBlur }: OptionsListType) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setTimeout(() => onBlur(), 100));

  return (
    <ul className="autocomplete__options-list" data-testid="options-list" ref={wrapperRef}>
      {options.map((opt) => (
        <li
          aria-label={opt}
          tabIndex={0}
          className="autocomplete__option-item"
          key={opt}
          onClick={() => onChange(opt)}
          onKeyDown={(evt) => evt.key === "Enter" && onChange(opt)}
          dangerouslySetInnerHTML={{
            __html: opt.replace(new RegExp(text, "ig"), `<mark>${text}</mark>`),
          }}
        />
      ))}
    </ul>
  );
}

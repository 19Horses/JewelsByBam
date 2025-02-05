export function wrapTextWithSpans(text) {
  return text.split(" ").map((word, index) => (
    <span
      key={`${word}-${index}`}
      className="word"
      style={{ "--index": index }}
    >
      {word}&nbsp;
    </span>
  ));
}

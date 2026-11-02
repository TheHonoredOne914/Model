// mathText — upgrades the pseudo-math written in the book artifacts to real
// looking math on screen: ^2 → superscript, sqrt(x) → √ with an overline,
// x1 → x with a subscript 1. The source is our own trusted JSON (no user
// input), so returning a small HTML string for dangerouslySetInnerHTML is safe.
// Applied ONLY to prose (slides, quiz, cards, examples) — never to ids/keys.
export function mathText(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // sqrt(...) → √ with overline; the pattern allows one nesting level of
  // parentheses inside (sqrt((x2 - x1)^2 + (y2 - y1)^2) is common in the books)
  for (let i = 0; i < 2; i++) {
    s = s.replace(/sqrt\(((?:[^()]|\([^()]*\))*)\)/g, '<span class="mth-sqrt">√<span>$1</span></span>');
  }
  // ³ style superscripts: ^{...} or ^N / ^letter
  s = s.replace(/\^\{([^{}]+)\}/g, "<sup>$1</sup>");
  s = s.replace(/\^([0-9]+|[a-zA-Z])/g, "<sup>$1</sup>");
  // standalone letter+digit pairs → subscript (x1, y2, v0, H2O, CO2)
  s = s.replace(/(?<![a-zA-Z0-9&])([a-zA-Z])(\d)(?![a-zA-Z0-9])/g, "$1<sub>$2</sub>");
  // tidy notation the books typed plainly
  s = s.replace(/(\d)\s*\*\s*(\d)/g, "$1 × $2").replace(/(\w)\s*->\s*(\w)/g, "$1 → $2");
  return s;
}

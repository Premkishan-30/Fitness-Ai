const themeColors = new Map();

export function getThemeColor(token, alpha = 1) {
  let value = themeColors.get(token);
  if (!value) {
    const property = token === 'accent'
      ? '--accent'
      : token === 'border-dark'
        ? '--border-dark'
        : `--brand-${token}`;
    value = getComputedStyle(document.documentElement).getPropertyValue(property).trim();
    themeColors.set(token, value);
  }
  if (alpha < 0 || alpha > 1) {
    throw new RangeError(`Invalid alpha for theme color: ${alpha}`);
  }
  if (alpha === 1 && /^rgba?\(/i.test(value)) return value;
  const match = /^#([0-9a-f]{6})$/i.exec(value);

  if (!match) {
    throw new Error(`Invalid theme color token: ${token}`);
  }
  if (alpha === 1) return value;

  const hex = match[1];
  const [red, green, blue] = [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

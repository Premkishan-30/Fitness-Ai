export default function MiniChart({ color, type = 'line' }) {
  if (type === 'bars') {
    return <div className="mobile-phone__bars">{[38, 58, 42, 76, 52, 88, 66].map((height, i) => <i key={i} style={{ height: `${height}%`, background: i === 5 ? color : `color-mix(in srgb, ${color} 20%, transparent)` }} />)}</div>;
  }
  return <svg className="mobile-phone__chart" viewBox="0 0 240 74" role="img" aria-label="Illustrative trend chart"><path d="M4 62 C 35 56, 42 34, 70 43 S 105 58, 128 33 S 166 40, 188 22 S 220 22, 236 9" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" /><path d="M4 62 C 35 56, 42 34, 70 43 S 105 58, 128 33 S 166 40, 188 22 S 220 22, 236 9 V74 H4Z" fill={`color-mix(in srgb, ${color} 8%, transparent)`} /></svg>;
}

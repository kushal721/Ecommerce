// Hand-drawn icon set in the style of Notion's interface icons:
// 24px grid, 1.6 stroke, rounded caps and joins, no fills except where noted.
const PATHS = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8.5h14l-1.1 11a1 1 0 0 1-1 .9H7.1a1 1 0 0 1-1-.9L5 8.5z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </>
  ),
  heart: <path d="M12 19.5s-7.5-4.6-7.5-10.1A4 4 0 0 1 12 7.2a4 4 0 0 1 7.5 2.2c0 5.5-7.5 10.1-7.5 10.1z" />,
  close: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  menu: <path d="M4.5 7.5h15M4.5 12h15M4.5 16.5h9" />,
  check: <path d="M5.5 12.5l4 4 9-9.5" />,
  chevronDown: <path d="M7 10l5 5 5-5" />,
  chevronLeft: <path d="M14.5 6.5L9 12l5.5 5.5" />,
  chevronRight: <path d="M9.5 6.5L15 12l-5.5 5.5" />,
  truck: (
    <>
      <path d="M3.5 6.5h10v9.5h-10z" />
      <path d="M13.5 9.5h3.7l3.3 3.4V16h-7" />
      <circle cx="7.5" cy="17.5" r="1.7" />
      <circle cx="16.8" cy="17.5" r="1.7" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.8V12l2.8 1.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5.5 18.5c0-7.5 4.7-12.3 13-13 0 8.3-4.7 13-12.3 13" />
      <path d="M5.5 18.5l6.5-6.5" />
    </>
  ),
  returns: (
    <>
      <path d="M9 6.5L5 10.5l4 4" />
      <path d="M5 10.5h9.5a4.5 4.5 0 0 1 0 9H12" />
    </>
  ),
  trash: (
    <>
      <path d="M5 7.5h14" />
      <path d="M9.5 7.5V5.5h5v2" />
      <path d="M7 7.5l.9 11.6a1 1 0 0 0 1 .9h6.2a1 1 0 0 0 1-.9L17 7.5" />
    </>
  ),
  sliders: (
    <>
      <path d="M4.5 8h9M18.5 8h1M4.5 16h3M11.5 16h8" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="9.5" cy="16" r="2.2" />
    </>
  ),
  box: (
    <>
      <path d="M4.5 8L12 4.5 19.5 8v8L12 19.5 4.5 16z" />
      <path d="M4.5 8L12 11.5 19.5 8M12 11.5v8" />
    </>
  ),
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  receipt: (
    <>
      <path d="M6.5 3.5h11v17l-2.7-1.6-2.8 1.6-2.8-1.6-2.7 1.6z" />
      <path d="M9.5 8.5h5M9.5 12h5" />
    </>
  ),
  star: <path d="M12 4.2l2.3 4.9 5.3.6-3.9 3.6 1 5.3L12 16l-4.7 2.6 1-5.3-3.9-3.6 5.3-.6z" />,
};

export default function Icon({ name, size = 20, filled = false, className = "", title }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title && <title>{title}</title>}
      {PATHS[name]}
    </svg>
  );
}

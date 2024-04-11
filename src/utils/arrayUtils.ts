export const toArray = (v) =>
  !v ? v : Array.isArray(v) ? v : [v];

export const toSafeArray = (v) =>
  !v ? [] : Array.isArray(v) ? v : [v];

export const toUniqueArray = (v) =>
  !v ? v : Array.from(new Set(toArray(v)));

export const toSafeUniqueArray = (v) =>
  !v ? [] : Array.from(new Set(toArray(v)));

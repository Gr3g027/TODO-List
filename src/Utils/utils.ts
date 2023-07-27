export function parseSize(size: string | number) {
  if (typeof size === "string") {
    return size;
  }
  return `${size}px`
}
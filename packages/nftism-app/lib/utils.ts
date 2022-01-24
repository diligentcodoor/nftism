export function numberWithCommas(x: number | string) {
  const _x = typeof x === "string" ? x : x.toString();
  return _x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

import { SearchParams, StringifiedSearchParams } from "../types/SearchParams";

// TODO: Покрыть Unit-тестами
export function stringifySearchParams(
  obj: SearchParams
): StringifiedSearchParams {
  const entries = Object.entries(obj).map(([key, value]) => [
    key,
    value.toString(),
  ]);

  return Object.fromEntries(entries);
}

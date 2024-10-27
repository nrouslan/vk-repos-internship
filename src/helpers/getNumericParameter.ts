import { isNonNegativeInteger } from "./isNonNegativeInteger";

// TODO: Покрыть Unit-тестами
export function getNumericParameter(
  searchParams: URLSearchParams,
  name: string,
  defaultValue: number
) {
  const page = searchParams.get(name);

  if (page && isNonNegativeInteger(page)) {
    return +page;
  } else {
    return defaultValue;
  }
}

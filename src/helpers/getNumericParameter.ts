// TODO: Покрыть тестами
export function getNumericParameter(
  searchParams: URLSearchParams,
  name: string,
  defaultValue: number
) {
  const page = searchParams.get(name);

  // TODO: Проверка на целое число
  if (page) {
    return +page;
  } else {
    return defaultValue;
  }
}

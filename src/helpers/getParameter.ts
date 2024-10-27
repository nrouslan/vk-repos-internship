// TODO: Покрыть тестами
export function getParameter(
  searchParams: URLSearchParams,
  name: string,
  defaultValue: string
) {
  const page = searchParams.get(name);

  if (page) {
    return page;
  } else {
    return defaultValue;
  }
}

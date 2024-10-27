import { useEffect, useState } from "react";
import { SearchParams } from "../types/SearchParams";
import { stringifySearchParams } from "../helpers/stringifySearchParams";

type ReturnType<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export function useSearchParams<T extends SearchParams>(
  initialSearchParams: T
): ReturnType<T> {
  const [searchParams, setSearchParams] = useState<T>(initialSearchParams);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(
      stringifySearchParams(searchParams)
    );

    const currentSearchParams = new URLSearchParams(window.location.search);

    // FIXME: Сделать более умную проверку на изменение строки поиска
    if (currentSearchParams.toString() !== newSearchParams.toString()) {
      window.location.search = newSearchParams.toString();
    }
  }, [searchParams]);

  return [searchParams, setSearchParams];
}

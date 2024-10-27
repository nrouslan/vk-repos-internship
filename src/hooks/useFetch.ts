import { useEffect } from "react";
import { ZodError } from "zod";

type FetchFunction = () => Promise<void>;

export function useFetch(fetchFunction: FetchFunction) {
  useEffect(() => {
    fetchFunction().catch((error) => {
      if (error instanceof ZodError) {
        console.log(
          `An error while parsing the response occured: ${error.message}`
        );
      } else {
        console.log(error);
      }
    });
  }, [fetchFunction]);
}

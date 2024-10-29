import { PropsWithChildren, useEffect, useRef } from "react";
import classes from "./InfiniteScroll.module.css";
import classNames from "classnames";

type NextFunction = () => void;

interface Props extends PropsWithChildren {
  className?: string;
  next: NextFunction;
  // loader: React.FC;
  // endMessage: React.FC;
}

export function InfiniteScroll({ className, next, children }: Props) {
  const _className = classNames(className, classes.infiniteScroll);

  const infiniteScrollRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (infiniteScrollRef.current) {
      const infiniteScroll = infiniteScrollRef.current;

      const handleScroll = () => {
        if (
          infiniteScroll.scrollTop + infiniteScroll.clientHeight >=
          infiniteScroll.scrollHeight - 5
        ) {
          next();
        }
      };

      infiniteScroll.addEventListener("scroll", handleScroll);
      return () => {
        infiniteScroll.removeEventListener("scroll", handleScroll);
      };
    }
  }, [next]);

  return (
    <div ref={infiniteScrollRef} className={_className}>
      {children}
    </div>
  );
}

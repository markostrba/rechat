import { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface TSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  startElement?: ReactNode;
  endElement?: ReactNode;
  className?: string;
  title?: string;
}

const SearchBox = ({
  startElement,
  endElement,
  className,
  ...inputProps
}: TSearchProps) => {
  return (
    <div
      className={clsx(
        "flex gap-2 p-2.5 rounded-full bg-zinc-200/60 font-medium items-center justify-center",
        className
      )}
    >
      {startElement && startElement}
      <input
        type="search"
        placeholder="Search..."
        className="outline-none flex-1"
        {...inputProps}
      />
      {endElement && endElement}
    </div>
  );
};

export default SearchBox;

import clsx from "clsx";
import styles from "./menuButton.module.scss";

export default function MenuButton({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      className={clsx(
        "cursor-pointer relative rounded-xl flex items-center bg-[rgba(240,240,240,0.2)] p-[7px]",
        styles.menu,
      )}
    >
      {children}
    </button>
  );
}

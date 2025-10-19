import { FaXmark } from "react-icons/fa6";

import styles from "./DeleteButton.module.css";

type Props = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const DeleteButton = ({ onClick }: Props) => {
  return (
    <button type="button" className={styles.btn} onClick={onClick}>
      <FaXmark />
    </button>
  );
};

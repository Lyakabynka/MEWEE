import { FC } from "react";
import styles from "./custom_button.module.scss";
import { ButtonPropsTypes } from "../data.interface";
const CustomButton: FC<ButtonPropsTypes> = ({ text, buttonType, onClick }) => {
  return (
    <>
      <div>
        <button className={styles.button} type={buttonType} onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
};

export default CustomButton;

import { FC } from "react";
import { ButtonPropsTypes } from "../../widget.interface";
import styles from "./custom_button.module.scss";
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

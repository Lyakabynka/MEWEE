import React, { FC, useState, useRef } from "react";
import { ReactComponent as EmojiIcon } from "../../../assets/image/icons/EmojiIcon.svg";
import { ReactComponent as SentIcon } from "../../../assets/image/icons/SentIcon.svg";
import AddCircle from "../../../assets/image/icons/AddCircle.svg";
import { smileData } from "../../widgetData";
import { smileDataTypes } from "../../widget.interface";
import styles from "./custom_input.module.scss";
import { useAuthStore } from "../../../entities";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

interface CustomInputProps {
  onSubmit?: (comment: string) => void; // Функция, вызываемая при отправке
  inputTypes: string;
  placeHolder: string;
}

const CustomInput: FC<CustomInputProps> = ({
  onSubmit,
  inputTypes,
  placeHolder,
}) => {
  const { t } = useTranslation();
  const { username } = useAuthStore();
  const [visibleSmile, setVisibleSmile] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null); // Создание рефа для элемента

  const handleClickSmileVisible = () => {
    setVisibleSmile(!visibleSmile);
  };

  const handleAddCircleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Вызов диалога выбора файла
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  const formik = useFormik({
    initialValues: {
      cvalue: "",
    },
    onSubmit: () => {
      if (onSubmit != undefined) {
        onSubmit(formik.values.cvalue);
        formik.resetForm(); // Сброс формы после отправки
      }
    },
  });
  return (
    <>
      <div className={styles.div}>
        {inputTypes === "chat" && (
          <>
            {/* Скрытый input */}
            <input
              type="file"
              id="fileInput"
              ref={fileInputRef}
              className="hidden-input"
              name="uploadedFile"
              style={{ display: "none" }}
            />
            <img src={AddCircle} onClick={handleAddCircleClick} />{" "}
            {/* Добавляем обработчик клика */}
          </>
        )}
        {inputTypes === "commentBar" && <button>{username}</button>}

        <input
          type="text"
          id="cvalue"
          name="cvalue"
          value={formik.values.cvalue}
          onChange={formik.handleChange}
          placeholder={placeHolder}
          onKeyDown={handleKeyDown}
        />

        <div>
          <EmojiIcon onClick={handleClickSmileVisible}/>
          <SentIcon onClick={() => formik.handleSubmit()}/>
        </div>

        <div
          className={
            visibleSmile
              ? styles.smile_icon
              : `${styles.smile_icon} ${styles._smile_icon_visible}`
          }
        >
          <ul>
            {smileData.map((item, index) => (
              <li key={index}>
                <img src={item.smile} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CustomInput;

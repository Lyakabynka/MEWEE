import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CustomModalIconPropsTypes,
  modalPostDataLinkTypes,
} from "../../widget.interface";
import styles from "./custom_modal_icon.module.scss";
const CustomModalIcon: FC<CustomModalIconPropsTypes> = ({ id, links }) => {
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const { t } = useTranslation();
  const handleModalClick = (postId: number) => {
    if (activeModalId === postId) {
      setActiveModalId(null);
    } else {
      setActiveModalId(postId);
    }
  };
  return (
    <>
      <div onClick={() => handleModalClick(id)} className={styles.modal_button}>
        <div />
        <div />
        <div />
      </div>
      {activeModalId === id && (
        <ul
          className={
            activeModalId == null
              ? styles.ul
              : `${styles.ul} ${styles._ul_visible}`
          }
        >
          {links ? (
            links.map((item: modalPostDataLinkTypes) => {
              return (
                <li key={item.id}>
                  <a href={item.url}>
                    <div>
                      <img src={`${item.icons}`} />
                      <h6>{t(`${item.text}`)}</h6>
                    </div>
                  </a>
                </li>
              );
            })
          ) : (
            <p>Ошибка сервера...</p>
          )}
        </ul>
      )}
    </>
  );
};

export default CustomModalIcon;

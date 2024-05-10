import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { modalChatsDataLink } from "../messengerData";
import styles from "./dialog_modal.module.scss";
const DialogModal: FC = () => {
  const [activeModalId, setActiveModalId] = useState<boolean>(true);
  const { t } = useTranslation();
  const handleModalClick = () => {
    setActiveModalId(!activeModalId);
  };
  return (
    <div className={styles.div}>
      <div onClick={handleModalClick} className={styles.modal_button}>
        <div />
        <div />
        <div />
      </div>
      <ul
        className={
          activeModalId ? styles.ul : `${styles.ul} ${styles._ul_visible}`
        }
      >
        {modalChatsDataLink ? (
          modalChatsDataLink.map((item) => {
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
    </div>
  );
};
export default DialogModal;

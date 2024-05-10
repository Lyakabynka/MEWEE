import React, { useState } from "react";
import { ReactComponent as BurgerMenuIcon } from "../../../assets/image/icons/BurgerMenuIcon.svg";
import { ReactComponent as ShowIcon } from "../../../assets/image/icons/ShowIcon.svg";
import { ReactComponent as SmsIcon } from "../../../assets/image/icons/SmsIcon.svg";
import styles from "./custom-burger-menu.module.scss";
import {useTranslation} from "react-i18next";

export const CustomBurgerMenu = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={styles.div}>
            <BurgerMenuIcon onClick={toggleMenu} />
            {isOpen &&
                <div>
                    <div>
                        <div><ShowIcon/></div>
                        <div>{t("hidden_chats")}</div>
                    </div>
                    <div>
                        <div><SmsIcon/></div>
                        <div>{t("unread")}</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default CustomBurgerMenu;

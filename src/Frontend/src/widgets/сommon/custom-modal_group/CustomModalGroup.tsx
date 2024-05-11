import React, { useState } from "react";
import { ReactComponent as FastenIcon } from "../../../assets/image/icons/FastenIcon.svg";
import { ReactComponent as ComplainIcon } from "../../../assets/image/icons/ComplainIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/image/icons/DeleteIcon.svg";
import { ReactComponent as BlockIcon } from "../../../assets/image/icons/BlockIcon.svg";
import { ReactComponent as HideIcon } from "../../../assets/image/icons/HideIcon.svg";
import styles from "./custom_modal_group.module.scss";
import {useTranslation} from "react-i18next";

export const CustomModalGroup = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [complainMenu, setComplainMenu] = useState(false);

    const handleAction = (action: string) => {
        switch (action) {
            case 'openMenu':
                setComplainMenu(true);
                break;
            case 'closeMenu':
                setComplainMenu(false);
                break;
            default:
                break;
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div className={styles.div}>
                <div onClick={toggleMenu}>
                    <div style={{backgroundColor: isOpen ? "#FBA500" : "#b67afe"}}/>
                    <div style={{backgroundColor: isOpen ? "#FBA500" : "#b67afe"}}/>
                    <div style={{backgroundColor: isOpen ? "#FBA500" : "#b67afe"}}/>
                </div>
                {isOpen &&
                    <div className={styles.menu}>
                        <div>
                            <div onClick={() => handleAction('openMenu')}>
                                <div><ComplainIcon/></div>
                                <div>{t("complain")}</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div><HideIcon/></div>
                                <div>{t("hide")}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
            {complainMenu && (
                <div className={styles.fullscreen_message}>
                    <div>{t("complain_sent")}</div>
                    <div>
                        <button onClick={() => handleAction('closeMenu')}>{t("close")}</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomModalGroup;

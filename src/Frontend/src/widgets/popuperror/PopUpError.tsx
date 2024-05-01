import { FC, useState, useEffect, useRef } from "react";
import styles from "./popup_error.module.scss";

export const PopUpError: FC<{ text: string, delay?: number, marginLeft?: string}> = ({ text, delay = 3000, marginLeft = "0" }) => {

    const [hidden, setHidden] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => { setHidden(true) }, delay);
    }, []);

    return (
        <section className={styles.popupSec}>
            {!hidden && (
                <div className={styles.div} style={{marginLeft: marginLeft}}>
                    <span>{text}</span>
                </div>
            )}
        </section>
    );
};

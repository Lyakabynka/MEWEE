import { FC, useState } from "react";
import EmojiIcon from "../../../assets/image/icons/EmojiIcon.svg"
import SentIcon from "../../../assets/image/icons/SentIcon.svg"
import { smileData } from "../../widgetData";
import { smileDataTypes } from "../../widget.interface";
import styles from "./custom_input.module.scss"
const CustomInput: FC = () => {
    const [visibleSmile, setVisibleSmile] = useState<boolean>(true)
    const handleClickSmileVisible = () => {
        setVisibleSmile(!visibleSmile);
    }
    return (
        <>
            <div className={styles.div}>
                <button>Nick</button>
                <input type="text" placeholder="Lorem ipsum..." />
                <div>
                    <img onClick={handleClickSmileVisible} src={EmojiIcon} />
                    <img src={SentIcon} />
                </div>
                <div className={visibleSmile ? styles.smile_icon :
                    `${styles.smile_icon} ${styles._smile_icon_visible}`}>
                    <ul>
                        {smileData && (
                            smileData.map((item: smileDataTypes) => {
                                return (
                                    <li key={item.id}>
                                        <img src={item.smile} />
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CustomInput;
import { FC, useState } from "react";
import EmojiIcon from "../../../assets/image/icons/EmojiIcon.svg"
import SentIcon from "../../../assets/image/icons/SentIcon.svg"
import { smileData } from "../../widgetData";
import { smileDataTypes } from "../../widget.interface";
import styles from "./custom_input.module.scss"
import { useAuthStore } from "../../../entities";
import { useFormik } from "formik";
import {useTranslation} from "react-i18next";
interface CustomInputProps {
    onSubmit: (comment: string) => void; // Function to be called on submit
}
const CustomInput: FC<CustomInputProps> = ({
    onSubmit
  }) => {
    const { t } = useTranslation();
    const { username } = useAuthStore();
    const [visibleSmile, setVisibleSmile] = useState<boolean>(true)
    const handleClickSmileVisible = () => {
        setVisibleSmile(!visibleSmile);
    }


    const formik = useFormik({
        initialValues: {
            cvalue: '',
        },
        onSubmit:()=>  
        {  
            onSubmit(formik.values.cvalue);
            formik.resetForm();
        }
    }
      );
    return (
        <>
            <div className={styles.div}>
                <button>{username}</button>
                <input type="text" id="cvalue" name="cvalue" value={formik.values.cvalue} onChange={formik.handleChange}
                       placeholder={t('add_comment_placeholder')} />
                <div>
                    <img onClick={handleClickSmileVisible} src={EmojiIcon} />
                    <img src={SentIcon} onClick={() => formik.handleSubmit()} />
                </div>
                <div className={visibleSmile ? styles.smile_icon :
                    `${styles.smile_icon} ${styles._smile_icon_visible}`}>
                    <ul>
                        {smileData && (
                            smileData.map((item: smileDataTypes, index: number) => {
                                return (
                                    <li key={index}> {/* Use index as the key */}
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
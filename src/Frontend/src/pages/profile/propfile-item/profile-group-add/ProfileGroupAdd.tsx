import React, {ChangeEvent, useState} from "react";
import styles from "./profile_group_add.module.scss"
import {useTranslation} from "react-i18next";
import { ReactComponent as IconClose } from"../../../../assets/image/icons/IconClose.svg";

interface Props {
    formik: any;
    handleDropdownChange: (value: string) => void;
    handleCreateGroup: () => void;
    setCreateGroupFormEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileGroupAdd: React.FC<Props> = ({
                                                 formik,
                                                 handleDropdownChange,
                                                 handleCreateGroup,
                                              setCreateGroupFormEnabled
                                             }) => {
    const { t } = useTranslation();
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const handleSubmit = () => {
        if (formik.values.groupName.length < 5) {
            setSubmitAttempted(true);
            return;
        }
        handleCreateGroup();
    };
    const options = [
        { value: 'Entertainment', text: "entertainment" },
        { value: 'Policy', text: "policy" },
        { value: 'Music', text: "music" },
        { value: 'Union', text: "unions" },
        { value: 'Education', text: "education" },
    ];
    const [selectedOptionText, setSelectedOptionText] = useState<string>(options[0].text);
    const handleOptionSelect = (value: string, text: string) => {
        setSelectedOptionText(text);
        handleDropdownChange(value);
    };

    return (
        <div className={styles.fullscreen_message}>
            <div>
                <IconClose onClick={() => setCreateGroupFormEnabled(false)} />
                <h2>{t('create_group')}</h2>
                <div className={styles.div_name}>
                    <div style={{
                        marginBottom: submitAttempted ? "1rem" : ""
                    }}>{t('name_group')}</div>
                    <div>
                        <input
                            required
                            autoComplete="groupName"
                            name="groupName"
                            id="groupName"
                            placeholder={t('group_name_placeholder') + "*"}
                            autoFocus
                            value={formik.values.groupName}
                            onChange={formik.handleChange}
                            minLength={5}
                        ></input>
                        {submitAttempted && <div className={styles.error}>{t('group_name_less')}</div>}
                    </div>
                </div>
                <div className={styles.div_category}>
                    <div>{t('category')}</div>
                    <div className={styles.selectContainer}>
                        <div className={styles.customSelect}>
                            <div className={styles.selectedOption}>{t(selectedOptionText)}</div>
                            <div className={styles.optionsContainer}>
                                {options.map((option) => (
                                    <div key={option.value} className={styles.option}
                                         onClick={() => handleOptionSelect(option.value, option.text)
                                         }>
                                        {t(option.text)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <button onClick={() => handleSubmit()}>{t('group_create')}</button>
            </div>
        </div>
    );
};

export default ProfileGroupAdd;

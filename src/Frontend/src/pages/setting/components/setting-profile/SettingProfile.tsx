import ProfilePictureUploader from "../../../../features/profilePictureUploader/ProfilePictureUploader";
import styles from "./setting_profile.module.scss"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import CustomSettingButtons from "../../../../widgets/сommon/custom-setting-buttons/CustomSettingButtons";
import { useTranslation } from "react-i18next";
import { useAuthStore, useUserStore } from "../../../../entities";

const SettingProfile = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();
    const { updateProfileFields } = useUserStore();
    const { t } = useTranslation();
    const options = [
        { value: '0', text: "not_selected" },
        { value: '1', text: "unmarried" },
        { value: '2', text: "dating" },
        { value: '3', text: "engaged" },
        { value: '4', text: "married" },
        { value: '5', text: "civil_marriage" },
        { value: '6', text: "in_love" },
        { value: '7', text: "everything_complicated" },
        { value: '8', text: "active_search" },
    ];
    const [selectedOptionText, setSelectedOptionText] = useState<string>(options[0].text);
    const handleOptionSelect = (text: string) => {
        setSelectedOptionText(text);
    };

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [newUsername, setNewUsername] = useState<string>("");
    const [newLocation, setNewLocation] = useState<string>("");

    const onResponse = (errors: string[]) => {
        if (errors.length === 0) {
            if (!isLoggedIn) {
                logout();
                navigate('/auth/login');
            }
            else navigate('/settings');

        }
        else console.error("Error saving settings", errors);
    }
    const handleOnConfirm = () => {
        console.log("confirmed");

        const data: any = {};
        if (!(selectedOptionText === "not_selected"))
            data.Status = selectedOptionText;

        if (!(newUsername === ""))
            data.Username = newUsername;

        if (!(newLocation === ""))
            data.Location = newLocation;


        updateProfileFields(onResponse, data);

    }
    return (
        <div className={styles.div}>
            <div className={styles.div_settings}>
                <div>
                    <div><h2>{t("change_avatar")}</h2></div>
                    <ProfilePictureUploader />
                </div>
                <div className={styles.div_link}>
                    <div>
                        <h2>{t("personal_link")}</h2>
                        <div>
                            <p>(?)</p>
                            <div className={styles.hide_div}>Особисте посилання допоможе вам пояснити друзям, як знайти
                                ваш профіль.
                            </div>
                        </div>
                    </div>
                    <input onChange={(e: any) => setNewUsername(e.target.value)} />
                </div>
                <div className={styles.div_status}>
                    <div><h2>{t("status")}</h2></div>
                    <div className={styles.selectContainer}>
                        <div className={styles.customSelect}>
                            <div className={styles.selectedOption}>{t(selectedOptionText)}</div>
                            <div className={styles.optionsContainer}>
                                {options.map((option) => (
                                    <div key={option.value} className={styles.option}
                                        onClick={() => handleOptionSelect(option.text)}>
                                        {t(option.text)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.div_link}>
                    <div><h2>{t("place_residence")}</h2></div>
                    <input onChange={(e: any) => setNewLocation(e.target.value)} />
                </div>
            </div>
            <CustomSettingButtons
                isVisible={true}
                onConfirm={handleOnConfirm}
                onNavigateBack={() => navigate('/settings')} />
        </div>
    );
};

export default SettingProfile;


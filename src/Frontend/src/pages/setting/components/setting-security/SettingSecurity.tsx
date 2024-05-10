import ProfilePictureUploader from "../../../../features/profilePictureUploader/ProfilePictureUploader";
import styles from "./setting_security.module.scss"
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import {styled} from "@mui/material/styles";
import CustomSettingButtons from "../../../../widgets/сommon/custom-setting-buttons/CustomSettingButtons";
import PageDevelopment from "../../../../widgets/сommon/page-development/PageDevelopment";
import './styled_switch.scss';
import { ReactComponent as ArrowRight } from "../../../../widgets/sideToolbar/images/arrow-right.svg";
import {useTranslation} from "react-i18next";

const SettingSecurity = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [statuses, setStatuses] = useState({
        device: false,
    });
    const handleStatusChange = (statusName:string, value:boolean) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [statusName]: value,
        }));
    };
    return (
        <div className={styles.div_container}>
            {!statuses.device ? (
                <div className={styles.div}>
                    <div>
                        <div>
                            <h2>{t('two_step_authentication_email')}</h2>
                            <Switch className="CustomSwitch"/>
                        </div>
                        <div onClick={() => handleStatusChange('device', !statuses.device)}
                             style={{cursor: 'pointer'}}>
                            <h2>{t('devices_management')}</h2>
                            <div className={styles.icon_container}><ArrowRight/></div>
                        </div>
                    </div>
                    <CustomSettingButtons
                        isVisible={true}
                        onNavigateBack={() => navigate('/settings')}/>
                </div>
            ) : (
                <div className={styles.div_device}>
                    {statuses.device && (
                        <div>
                            <PageDevelopment/>
                            <CustomSettingButtons
                                isVisible={false}
                                onNavigateBack={() => handleStatusChange('device', !statuses.device)}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SettingSecurity;

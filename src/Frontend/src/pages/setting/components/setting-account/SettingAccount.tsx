import React, {useState} from "react";
import styles from "./setting_account.module.scss"
import CustomSettingButtons from "../../../../widgets/сommon/custom-setting-buttons/CustomSettingButtons";
import {useNavigate} from "react-router-dom";
import PageDevelopment from "../../../../widgets/сommon/page-development/PageDevelopment";
import {useTranslation} from "react-i18next";
import { ReactComponent as ArrowRight } from "../../../../widgets/sideToolbar/images/arrow-right.svg";

const SettingAccount = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [statuses, setStatuses] = useState({
        password: false,
        business: false,
        delete: false,
    });
    const handleStatusChange = (statusName:string, value:boolean) => {
        setStatuses(prevStatuses => ({
            ...prevStatuses,
            [statusName]: value,
        }));
    };

    return (
        <div className={styles.div_container}>
            {!statuses.password && !statuses.business && !statuses.delete? (
                <div className={styles.div}>
                    <div>
                        <div onClick={() => handleStatusChange('password', !statuses.password)}
                             style={{cursor: 'pointer'}}>
                            <h2>{t('change_password')}</h2>
                            <div className={styles.icon_container}><ArrowRight/></div>
                        </div>
                        <div onClick={() => handleStatusChange('business', !statuses.business)}
                             style={{cursor: 'pointer'}}>
                            <h2>{t('business_account')}</h2>
                            <div className={styles.icon_container}><ArrowRight/></div>
                        </div>
                        <div onClick={() => handleStatusChange('delete', !statuses.delete)}
                             style={{cursor: 'pointer'}}>
                            <h2>{t('delete_account')}</h2>
                            <div className={styles.icon_container}><ArrowRight/></div>
                        </div>
                    </div>
                    <div>
                    <CustomSettingButtons
                            isVisible={false}
                            onNavigateBack={() => navigate('/settings')}/>
                    </div>
                </div>
            ) : (
                <div className={styles.div_device}>
                    {statuses.password && (
                        <div>
                            <PageDevelopment/>
                            <CustomSettingButtons
                                isVisible={false}
                                onNavigateBack={() => handleStatusChange('password', !statuses.password)}/>
                        </div>
                    )}
                    {statuses.business && (
                        <div>
                            <PageDevelopment />
                            <CustomSettingButtons
                                isVisible={false}
                                onNavigateBack={() => handleStatusChange('business', !statuses.business)}/>
                        </div>
                    )}
                    {statuses.delete && (
                        <div>
                            <PageDevelopment />
                            <CustomSettingButtons
                                isVisible={false}
                                onNavigateBack={() => handleStatusChange('delete', !statuses.delete)}/>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SettingAccount;

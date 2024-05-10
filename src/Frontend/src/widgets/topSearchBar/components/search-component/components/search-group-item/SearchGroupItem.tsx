import React, { FC, useState } from "react";
import styles from "./search_group_item.module.scss"
import { ReactComponent as CloseIcon } from "../../../../../../assets/image/icons/CloseIcon.svg";
import DecryptedImg from "../../../../../../pages/profile/DecryptedImg";
import { useNavigate } from "react-router-dom";

export const SearchGroupItem: FC<{ item: any, }> = ({
    item,
}) => {
    const [show, setShow] = useState<boolean>(true);
    const navigate = useNavigate();
    return (
        <>
            {show && (
                <div className={styles.div} >
                    <div onClick={() => navigate('/group/' + item.nickname)}>
                        <DecryptedImg content={item.avatar}></DecryptedImg>
                        <h5>@{item.nickname}</h5>
                    </div>
                    <div>
                        <CloseIcon onClick={() => { setShow(false); }} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchGroupItem;

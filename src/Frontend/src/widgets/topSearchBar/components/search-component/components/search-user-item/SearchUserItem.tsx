import React, { FC, useState } from "react";
import styles from "./search_user_item.module.scss"
import { ReactComponent as CloseIcon } from "../../../../../../assets/image/icons/CloseIcon.svg";
import DecryptedImg from "../../../../../../pages/profile/DecryptedImg";
import { useNavigate } from "react-router-dom";

export const SearchUserItem: FC<{ item:any, }> = ({
    item,
}) => {
    const navigate=  useNavigate();
    const [show, setShow] = useState<boolean>(true);
    return (
        <>
        {show && (
        <div className={styles.div}>
            <div  onClick={() => navigate('/profile/'+item.username)}>
                <DecryptedImg content={item.avatar}></DecryptedImg>
                <h2>{item.firstName} {item.secondName}</h2>
                <h5>(@{item.username})</h5>
            </div>
            <div>
                <CloseIcon onClick={()=>{setShow(false);}} />
            </div>
        </div>
        )}
        </>
    );
};

export default SearchUserItem;

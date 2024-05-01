import { FC } from "react";
import { friendDataPropsTypes } from "../../profileData.interface";
import styles from "./friends.module.scss";
const Friends: FC<friendDataPropsTypes> = ({ friendData }) => {
  return (
    <>
      <div className={styles.div}>
        <ul>
          {friendData &&
            friendData.map((item) => {
              return (
                <li key={item.id}>
                  {item.online ? (
                    <img className={styles.switch} src={item.onlineSwitch} />
                  ) : (
                    ""
                  )}
                  <img src={item.avatar} />
                  <h2>{item.name}</h2>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Friends;

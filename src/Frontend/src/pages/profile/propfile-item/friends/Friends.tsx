import { FC, useState, useEffect } from "react";
import { friendDataPropsTypes } from "../../profileData.interface";
import styles from "./friends.module.scss";
import { decryptImage } from "../../../../entities/sharedStores/post-utils";
import { Link, useNavigate } from "react-router-dom";

const Friends: FC<{ friendsData: any }> = ({ friendsData }) => {
  const [avatarImages, setAvatarImages] = useState<string[]>([]);
  const navigate = useNavigate();
   console.log(friendsData);

  useEffect(() => {
    const fetchAvatars = async () => {
      const decryptedAvatars = await Promise.all(
        friendsData.map(async (friend: any) => {
          try {
            if (friend.avatar) {
              const decryptedAvatar = await decryptImage(friend.avatar);
              return decryptedAvatar;
            }
            return null;
          } catch (error) {
            console.error("Error decrypting image:", error);
            return null;
          }
        })
      );
      setAvatarImages(decryptedAvatars);
    };

    fetchAvatars();
  }, [friendsData]);

  return (
    <>
      {friendsData && (
        <div className={styles.div}>
          <ul>
            {friendsData &&
              friendsData.map((item: any, index: number) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      navigate("/profile/" + item.username?? item.nickname, { replace: false });
                      
                    }}
                  >
                    {item.online ? (
                      <img className={styles.switch} src={item.onlineSwitch} />
                    ) : (
                      ""
                    )}
                    {avatarImages[index] && (
                      <img src={avatarImages[index]} alt="Decrypted Avatar" />
                    )}
                    <h2>{item.username ?? item.nickname}</h2>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Friends;

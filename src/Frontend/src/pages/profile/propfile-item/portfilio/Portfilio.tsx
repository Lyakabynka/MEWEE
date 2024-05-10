import { FC } from "react";
import {
  portfilioDataPropsTypes,
  portfilioDataTypes,
  reviewsStarTypes,
  sertificateTypes,
} from "../../profileData.interface";
import styles from "./portfilio.module.scss";
const Portfilio: FC<portfilioDataPropsTypes> = ({
  portfilioData,
  setificateData,
}) => {
  return (
    <>
      <div className={styles.div}>
        <h1>Відгуки від моїх клієнтів</h1>
        <div className={styles.sub_div1}>
          {portfilioData &&
            portfilioData.map((item: portfilioDataTypes) => {
              return (
                <div className={styles.sub_div1_item} key={item.id}>
                  <div>
                    <div>
                      <img src={item.reviewsUserAvatar} />
                      <h2>{item.reviewsUserName}</h2>
                    </div>
                    <h3>{item.reviews}</h3>
                  </div>
                  <div>
                    {item.reviewsStar &&
                      item.reviewsStar.map((subItem: reviewsStarTypes) => {
                        return (
                          <div key={subItem.id}>
                            <img src={subItem.image} />
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className={styles.sub_div2}>
          <h1>Відгуки від моїх клієнтів</h1>
          <div>
            {setificateData &&
              setificateData.map((item: sertificateTypes) => {
                return (
                  <div key={item.id}>
                    <img src={item.image} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfilio;

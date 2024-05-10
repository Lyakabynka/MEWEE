import { FC, useState, useEffect } from "react";
import { dataSideBarTypes, groupDataPropTypes } from "../groupData.interface";
import styles from "./sidebar.module.scss";
const Sidebar: FC<groupDataPropTypes> = ({ data, onCategoryChanged }) => {
  const [activeItemId, setActiveItemId] = useState<number | null>(null);

  useEffect(() => {
    if (data.length > 0 && activeItemId === null) {
      setActiveItemId(data[0].id);
    }
  }, [activeItemId]);

  const handleLiClick = (id: number, itemId: string) => {
    setActiveItemId(id);
    onCategoryChanged(itemId);
  };

  return (
    <div className={styles.div}>
      <ul>
        {data &&
          data.map((item: dataSideBarTypes) => {
            return (
              <li
                className={`${styles.li} ${
                  item.id === activeItemId ? styles._li_active : ""
                }`}
                key={item.id}

                onClick={() => handleLiClick(item.id, item.category)}
              >
                <a>
                  <h5>{item.text}</h5>
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
export default Sidebar;

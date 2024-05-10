import React, { FC, useState } from "react";
import styles from "./search.module.scss";
import SearchUserItem from "./components/search-user-item/SearchUserItem";
import SearchGroupItem from "./components/search-group-item/SearchGroupItem";



export const Search: FC<{ users:any, groups: any }> = ({
    users,
    groups
}) => {

    return (
        <div className={styles.menu}>
            {users && users.map((item:any) => <SearchUserItem item={item} />)}
            {groups && groups.map((item:any) => <SearchGroupItem item={item} />)}
        </div>
    );
};

export default Search;

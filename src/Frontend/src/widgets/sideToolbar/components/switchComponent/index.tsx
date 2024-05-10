import React, { useState } from "react";
import styles from "./switch_component.module.scss"
import { useThemeStore } from "../../../../entities";

export const SwitchComponent = () => {
    const handleGog = () => {
        const gog = "";
    };
    const { currentTheme, currentThemeIndex, cycleThemes, getCurrentTheme } = useThemeStore();
    return (
        <label className={styles.switch}>
            <input
                type="checkbox"
                className={styles.switch_input}
                onChange={handleGog}
                checked={currentThemeIndex === 1}
                onClick={cycleThemes}
            />
            <span className={styles.switch_slider}></span>
        </label>
    );
};

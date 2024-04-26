
import { Theme } from '@mui/material/styles';

function setThemeVariables(currentTheme: Theme | null) {
    if (currentTheme !== null) {
        const root = document.documentElement;
        const validSections = ['authPages', 'mainPage'];

        Object.entries(currentTheme).forEach(([section, properties]) => {
            if (validSections.includes(section) && typeof properties === 'object') {
                const props = properties as Record<string, unknown>;
                Object.entries(props).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        const cssVariable = `--${section}_${key}`;
                        root.style.setProperty(cssVariable, value);
                    } else if (typeof value === 'object') {
                        const innerProps = value as Record<string, string>;
                        Object.entries(innerProps).forEach(([innerKey, innerValue]) => {
                            const cssVariable = `--${section}_${key}_${innerKey}`;
                            root.style.setProperty(cssVariable, innerValue);
                        });
                    }
                });
            }
        });
    }
}



export { setThemeVariables };

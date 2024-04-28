
import { Theme } from '@mui/material/styles';



function setThemeVariables(currentTheme: Theme | null, prefix = '') {
    const root = document.documentElement;
    const validSections = ['authPages', 'mainPage'];

    const processTheme = (theme: Record<string, unknown>, parentPrefix = '') => {
        Object.entries(theme).forEach(([key, value]) => {
            const cssVariable = `--${parentPrefix}${prefix ? `_${prefix}` : ''}_${key}`;
            if (typeof value === 'string') {
                root.style.setProperty(cssVariable, value);
            } else if (typeof value === 'object') {
                processTheme(value as Record<string, unknown>, `${parentPrefix}${prefix ? `_${prefix}` : ''}_${key}`);
            }
        });
    };

    if (currentTheme !== null) {
        validSections.forEach(section => {
            if (section in currentTheme && typeof currentTheme[section as keyof Theme] === 'object') {
                processTheme(currentTheme[section as keyof Theme] as Record<string, unknown>, section);
            }
        });
    }
}




export { setThemeVariables };

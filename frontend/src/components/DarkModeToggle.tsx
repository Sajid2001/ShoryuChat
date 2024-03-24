import { useEffect, useState } from "react";
import { lightModeIcon, darkModeIcon } from "../imports/SVGIcons";
const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem('darkMode') === 'true' ? true : false);

    const setDarkMode = () => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
    }

    useEffect(() => {
       setDarkMode();
      }, [isDarkMode]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
        localStorage.setItem('darkMode', String(!isDarkMode));
      };

  return (
    <div className="flex justify-center items-center">
      <button
        className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        onClick={handleToggle}
      >
        {isDarkMode ? 
        lightModeIcon: 
        darkModeIcon}

      </button>
    </div>
  )
}

export default DarkModeToggle
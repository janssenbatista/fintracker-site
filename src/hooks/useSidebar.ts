import { useState } from 'react';

export const useSidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const showSidebar = () => {
    console.log('updated');

    setIsSidebarVisible(true);
  };

  const hideSidebar = () => {
    console.log('updated');

    setIsSidebarVisible(false);
  };

  return {
    isSidebarVisible,
    showSidebar,
    hideSidebar,
  };
};

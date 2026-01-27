"use client";

import { useEffect } from "react";

interface DynamicFaviconProps {
  iconUrl: string | undefined;
}

export const DynamicFavicon = ({ iconUrl }: DynamicFaviconProps) => {
  useEffect(() => {
    if (!iconUrl) return;

    const setFavicon = (url: string) => {
      const existingLinks = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      );
      existingLinks.forEach((link) => link.remove());

      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = url;
      document.head.appendChild(favicon);

      const shortcutIcon = document.createElement("link");
      shortcutIcon.rel = "shortcut icon";
      shortcutIcon.href = url;
      document.head.appendChild(shortcutIcon);

      const appleTouchIcon = document.createElement("link");
      appleTouchIcon.rel = "apple-touch-icon";
      appleTouchIcon.href = url;
      document.head.appendChild(appleTouchIcon);
    };

    setFavicon(iconUrl);

    return () => {
      const links = document.querySelectorAll(
        'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]'
      );
      links.forEach((link) => link.remove());
    };
  }, [iconUrl]);

  return null;
};

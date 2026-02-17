import React from 'react';
import { ThemeProps } from "./types";
import ModernLuxury from "./ModernLuxury";

export const themeRegistry: Record<string, React.ComponentType<ThemeProps>> = {
  "modern-luxury": ModernLuxury,
  "default-luxury": ModernLuxury,
};

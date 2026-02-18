import React from 'react';
import { ThemeProps } from "./types";
import ModernLuxury from "./ModernLuxury";
import NusaOrganic from "./NusaOrganic";

export const themeRegistry: Record<string, React.ComponentType<ThemeProps>> = {
  "modern-luxury": ModernLuxury,
  "default-luxury": ModernLuxury,
  "nusa-organic": NusaOrganic,
};

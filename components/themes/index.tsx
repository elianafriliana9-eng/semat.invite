import React from 'react';
import { ThemeProps } from "./types";
import ModernLuxury from "./ModernLuxury";
import NusaOrganic from "./NusaOrganic";
import KromoInggil from "./KromoInggil";
import Senandika from "@/components/templates/Senandika";

export const themeRegistry: Record<string, React.ComponentType<ThemeProps>> = {
  "modern-luxury": ModernLuxury,
  "default-luxury": ModernLuxury,
  "nusa-organic": NusaOrganic,
  "kromo-inggil": KromoInggil,
  "senandika": Senandika,
};

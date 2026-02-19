import React from 'react';
import { ThemeProps } from "./types";
import ModernLuxury from "./ModernLuxury";
import NusaOrganic from "./NusaOrganic";
import KromoInggil from "./KromoInggil";
import Senandika from "@/components/templates/Senandika";
import Aksara from "@/components/templates/Aksara";
import Rona from "@/components/templates/Rona";
import ParahyanganBold from "@/components/templates/ParahyanganBold";

export const themeRegistry: Record<string, React.ComponentType<ThemeProps>> = {
  "modern-luxury": ModernLuxury,
  "default-luxury": ModernLuxury,
  "nusa-organic": NusaOrganic,
  "kromo-inggil": KromoInggil,
  "senandika": Senandika,
  "aksara": Aksara,
  "rona": Rona,
  "parahyangan-bold": ParahyanganBold,
};

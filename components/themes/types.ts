import { InvitationData } from "@/store/builderStore";

export interface ThemeProps {
  data: InvitationData;
  id?: string;
  isPreview?: boolean;
  guestName?: string;
}

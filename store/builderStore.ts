import { create } from 'zustand'

export interface InvitationData {
  themeId: string
  couple: {
    groom: {
      name: string
      fullName: string
      fatherName: string
      motherName: string
      instagram?: string
      photo?: string
    }
    bride: {
      name: string
      fullName: string
      fatherName: string
      motherName: string
      instagram?: string
      photo?: string
    }
  }
  events: {
    id: string
    title: string
    date: string
    startTime: string
    endTime: string
    locationName: string
    address: string
    googleMapsUrl?: string
  }[]
  gallery: {
    url: string
    type: 'image' | 'video'
  }[]
  sections: {
    id: string
    type: string
    enabled: boolean
    order: number
    settings: any
  }[]
  rsvp: {
    enabled: boolean
    whatsappNumber?: string
    showGuestsCount: boolean
    showGuestBook: boolean
  }
  music: {
    enabled: boolean
    url: string
    title: string
    autoStart: boolean
  }
  story: {
    id: string
    date: string
    title: string
    description: string
    image?: string
  }[]
  gifts: {
    id: string
    bankName: string
    accountNumber: string
    accountHolder: string
    qrCode?: string
  }[]
  metadata: {
    isPaid: boolean
    slug: string
    musicUrl?: string
  }
}

interface BuilderState {
  data: InvitationData
  invitationId?: string
  updateCouple: (person: 'groom' | 'bride', fields: Partial<InvitationData['couple']['groom']>) => void
  addEvent: (event: InvitationData['events'][0]) => void
  removeEvent: (id: string) => void
  updateEvent: (id: string, fields: Partial<InvitationData['events'][0]>) => void
  updateTheme: (themeId: string) => void
  addGalleryItem: (item: InvitationData['gallery'][0]) => void
  removeGalleryItem: (url: string) => void
  updateRSVP: (fields: Partial<InvitationData['rsvp']>) => void
  updateMusic: (fields: Partial<InvitationData['music']>) => void
  addStoryItem: (item: InvitationData['story'][0]) => void
  removeStoryItem: (id: string) => void
  updateStoryItem: (id: string, fields: Partial<InvitationData['story'][0]>) => void
  addGiftAccount: (gift: InvitationData['gifts'][0]) => void
  removeGiftAccount: (id: string) => void
  updateGiftAccount: (id: string, fields: Partial<InvitationData['gifts'][0]>) => void
  updateMetadata: (fields: Partial<InvitationData['metadata']>) => void
  setInitialData: (data: InvitationData, id?: string) => void
  // UI States
  previewKey: number
  resetPreview: () => void
  isMusicPlaying: boolean
  setMusicPlaying: (playing: boolean) => void
  isFullPreview: boolean
  setFullPreview: (open: boolean) => void
}

const initialData: InvitationData = {
  themeId: 'default-luxury',
  couple: {
    groom: { name: '', fullName: '', fatherName: '', motherName: '' },
    bride: { name: '', fullName: '', fatherName: '', motherName: '' },
  },
  events: [],
  gallery: [],
  story: [],
  gifts: [],
  sections: [
    { id: 'hero-1', type: 'hero', enabled: true, order: 0, settings: {} },
    { id: 'couple-1', type: 'couple', enabled: true, order: 1, settings: {} },
    { id: 'event-1', type: 'event', enabled: true, order: 2, settings: {} },
  ],
  rsvp: {
    enabled: true,
    whatsappNumber: '',
    showGuestsCount: true,
    showGuestBook: true
  },
  music: {
    enabled: true,
    url: 'https://www.bensound.com/bensound-music/bensound-love.mp3', // Default sample
    title: 'Love Story',
    autoStart: true
  },
  metadata: {
    isPaid: false,
    slug: '',
  }
}

export const useBuilderStore = create<BuilderState>((set) => ({
  data: initialData,
  updateCouple: (person, fields) => set((state) => ({
    data: {
      ...state.data,
      couple: {
        ...state.data.couple,
        [person]: { ...state.data.couple[person], ...fields }
      }
    }
  })),
  addEvent: (event) => set((state) => ({
    data: {
      ...state.data,
      events: [...state.data.events, event]
    }
  })),
  removeEvent: (id) => set((state) => ({
    data: {
      ...state.data,
      events: state.data.events.filter(e => e.id !== id)
    }
  })),
  updateEvent: (id, fields) => set((state) => ({
    data: {
      ...state.data,
      events: state.data.events.map(e => e.id === id ? { ...e, ...fields } : e)
    }
  })),
  updateTheme: (themeId) => set((state) => ({
    data: { ...state.data, themeId }
  })),
  addGalleryItem: (item) => set((state) => ({
    data: {
      ...state.data,
      gallery: [...state.data.gallery, item]
    }
  })),
  removeGalleryItem: (url) => set((state) => ({
    data: {
      ...state.data,
      gallery: state.data.gallery.filter(item => item.url !== url)
    }
  })),
  updateRSVP: (fields) => set((state) => ({
    data: {
      ...state.data,
      rsvp: { ...state.data.rsvp, ...fields }
    }
  })),
  updateMusic: (fields) => set((state) => ({
    data: {
      ...state.data,
      music: { ...state.data.music, ...fields }
    }
  })),
  addStoryItem: (item) => set((state) => ({
    data: {
      ...state.data,
      story: [...state.data.story, item]
    }
  })),
  removeStoryItem: (id) => set((state) => ({
    data: {
      ...state.data,
      story: state.data.story.filter(s => s.id !== id)
    }
  })),
  updateStoryItem: (id, fields) => set((state) => ({
    data: {
      ...state.data,
      story: state.data.story.map(s => s.id === id ? { ...s, ...fields } : s)
    }
  })),
  addGiftAccount: (gift) => set((state) => ({
    data: {
      ...state.data,
      gifts: [...state.data.gifts, gift]
    }
  })),
  removeGiftAccount: (id) => set((state) => ({
    data: {
      ...state.data,
      gifts: state.data.gifts.filter(g => g.id !== id)
    }
  })),
  updateGiftAccount: (id, fields) => set((state) => ({
    data: {
      ...state.data,
      gifts: state.data.gifts.map(g => g.id === id ? { ...g, ...fields } : g)
    }
  })),
  updateMetadata: (fields) => set((state) => ({
    data: {
      ...state.data,
      metadata: { ...state.data?.metadata, ...fields }
    }
  })),
  setInitialData: (data, id) => set({ 
    data: data ? { 
      ...initialData, 
      ...data,
      themeId: data.themeId || initialData.themeId,
      couple: {
        groom: { ...initialData.couple.groom, ...(data.couple?.groom || {}) },
        bride: { ...initialData.couple.bride, ...(data.couple?.bride || {}) }
      },
      events: data.events || [],
      gallery: data.gallery || [],
      story: data.story || [],
      gifts: data.gifts || [],
      rsvp: { ...initialData.rsvp, ...(data.rsvp || {}) },
      music: { ...initialData.music, ...(data.music || {}) },
      metadata: { ...initialData.metadata, ...(data.metadata || {}) } 
    } : initialData, 
    invitationId: id 
  }),
  // UI States
  previewKey: 0,
  resetPreview: () => set((state) => ({ previewKey: state.previewKey + 1 })),
  isMusicPlaying: false,
  setMusicPlaying: (playing) => set({ isMusicPlaying: playing }),
  isFullPreview: false,
  setFullPreview: (open) => set({ isFullPreview: open }),
}))

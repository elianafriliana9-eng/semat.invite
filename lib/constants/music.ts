export interface MusicTrack {
  title: string;
  url: string;
  category?: string;
}

export const MUSIC_LIBRARY: MusicTrack[] = [
  { 
    title: 'Romantic Wedding Piano', 
    url: 'https://www.bensound.com/bensound-music/bensound-love.mp3',
    category: 'Wedding Theme Loop'
  },
  { 
    title: 'Acoustic Wedding', 
    url: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_Wedding_Invitation.mp3',
    category: 'Wedding Theme Loop'
  },
  { 
    title: 'Classic Canon in D', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'Classical'
  },
  { 
    title: 'Soft Harp Melodies', 
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    category: 'Wedding Theme Loop'
  }
];

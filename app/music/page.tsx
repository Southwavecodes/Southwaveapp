'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Play, Pause, ExternalLink, Calendar, Clock } from 'lucide-react'

interface Track {
  id: string
  title: string
  duration: string
  preview_url?: string
  spotify_url: string
  apple_music_url: string
  release_date: string
  album_art: string
  isNew?: boolean
}

interface Album {
  id: string
  title: string
  release_date: string
  cover_art: string
  spotify_url: string
  apple_music_url: string
  tracks: Track[]
}

export default function MusicPage() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  const upcomingTracks: Track[] = [
    {
      id: 'upcoming-1',
      title: 'Midnight Tide',
      duration: '4:23',
      spotify_url: '#',
      apple_music_url: '#',
      release_date: '2024-03-15',
      album_art: '/images/midnight-tide-cover.jpg',
      isNew: true,
    },
    {
      id: 'upcoming-2',
      title: 'Neon Waves (Remix)',
      duration: '5:41',
      spotify_url: '#',
      apple_music_url: '#',
      release_date: '2024-04-02',
      album_art: '/images/neon-waves-remix-cover.jpg',
      isNew: true,
    },
  ]

  const albums: Album[] = [
    {
      id: 'album-1',
      title: 'Deep Currents',
      release_date: '2023-11-20',
      cover_art: '/images/deep-currents-album.jpg',
      spotify_url: 'https://open.spotify.com/album/example',
      apple_music_url: 'https://music.apple.com/album/example',
      tracks: [
        {
          id: 'track-1',
          title: 'Ocean Floor',
          duration: '6:14',
          preview_url: '/audio/ocean-floor-preview.mp3',
          spotify_url: 'https://open.spotify.com/track/example1',
          apple_music_url: 'https://music.apple.com/song/example1',
          release_date: '2023-11-20',
          album_art: '/images/deep-currents-album.jpg',
        },
        {
          id: 'track-2',
          title: 'Tidal Flow',
          duration: '5:28',
          preview_url: '/audio/tidal-flow-preview.mp3',
          spotify_url: 'https://open.spotify.com/track/example2',
          apple_music_url: 'https://music.apple.com/song/example2',
          release_date: '2023-11-20',
          album_art: '/images/deep-currents-album.jpg',
        },
        {
          id: 'track-3',
          title: 'Underwater Dreams',
          duration: '7:33',
          preview_url: '/audio/underwater-dreams-preview.mp3',
          spotify_url: 'https://open.spotify.com/track/example3',
          apple_music_url: 'https://music.apple.com/song/example3',
          release_date: '2023-11-20',
          album_art: '/images/deep-currents-album.jpg',
        },
      ],
    },
    {
      id: 'album-2',
      title: 'Horizon EP',
      release_date: '2023-06-10',
      cover_art: '/images/horizon-ep-cover.jpg',
      spotify_url: 'https://open.spotify.com/album/example2',
      apple_music_url: 'https://music.apple.com/album/example2',
      tracks: [
        {
          id: 'track-4',
          title: 'Dawn Break',
          duration: '4:45',
          preview_url: '/audio/dawn-break-preview.mp3',
          spotify_url: 'https://open.spotify.com/track/example4',
          apple_music_url: 'https://music.apple.com/song/example4',
          release_date: '2023-06-10',
          album_art: '/images/horizon-ep-cover.jpg',
        },
        {
          id: 'track-5',
          title: 'Sunset Drift',
          duration: '5:12',
          preview_url: '/audio/sunset-drift-preview.mp3',
          spotify_url: 'https://open.spotify.com/track/example5',
          apple_music_url: 'https://music.apple.com/song/example5',
          release_date: '2023-06-10',
          album_art: '/images/horizon-ep-cover.jpg',
        },
      ],
    },
  ]

  const handlePlayPreview = (track: Track) => {
    if (!track.preview_url) return

    if (currentlyPlaying === track.id) {
      audio?.pause()
      setCurrentlyPlaying(null)
    } else {
      if (audio) {
        audio.pause()
      }
      
      const newAudio = new Audio(track.preview_url)
      newAudio.play()
      setCurrentlyPlaying(track.id)
      setAudio(newAudio)

      newAudio.onended = () => {
        setCurrentlyPlaying(null)
        setAudio(null)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audio])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-8 sm:pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Music
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore Southwave's discography and upcoming releases
          </p>
        </motion.div>

        {upcomingTracks.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Calendar className="mr-3 text-primary-400" size={32} />
              Upcoming Releases
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {upcomingTracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="music-card rounded-xl p-6 flex items-center space-x-4"
                >
                  <div className="relative">
                    <Image
                      src={track.album_art}
                      alt={track.title}
                      width={80}
                      height={80}
                      className="rounded-lg"
                    />
                    {track.isNew && (
                      <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-lg">{track.title}</h3>
                    <p className="text-gray-400 flex items-center">
                      <Clock size={16} className="mr-1" />
                      {track.duration}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Release Date: {formatDate(track.release_date)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8">
            Released Albums & EPs
          </h2>
          
          {albums.map((album, albumIndex) => (
            <motion.div
              key={album.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: albumIndex * 0.2 }}
              className="mb-12"
            >
              <div className="flex flex-col md:flex-row md:items-start mb-6">
                <div className="md:w-64 mb-4 md:mb-0 md:mr-8">
                  <Image
                    src={album.cover_art}
                    alt={album.title}
                    width={256}
                    height={256}
                    className="rounded-xl shadow-2xl mx-auto md:mx-0"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{album.title}</h3>
                  <p className="text-gray-400 mb-4">Released {formatDate(album.release_date)}</p>
                  
                  <div className="flex space-x-4 mb-6">
                    <a
                      href={album.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Spotify
                    </a>
                    <a
                      href={album.apple_music_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full text-sm font-medium transition-colors"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Apple Music
                    </a>
                  </div>
                  
                  <div className="space-y-3">
                    {album.tracks.map((track, trackIndex) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {track.preview_url && (
                            <button
                              onClick={() => handlePlayPreview(track)}
                              className="w-8 h-8 flex items-center justify-center bg-primary-600 hover:bg-primary-700 rounded-full text-white transition-colors"
                            >
                              {currentlyPlaying === track.id ? (
                                <Pause size={16} />
                              ) : (
                                <Play size={16} />
                              )}
                            </button>
                          )}
                          <div>
                            <p className="text-white font-medium">{track.title}</p>
                            <p className="text-gray-400 text-sm">{track.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <a
                            href={track.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:text-green-300 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                          <a
                            href={track.apple_music_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </div>
    </div>
  )
}
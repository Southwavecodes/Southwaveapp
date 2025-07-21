export interface SpotifyTrack {
  id: string
  name: string
  preview_url: string | null
  external_urls: {
    spotify: string
  }
  album: {
    id: string
    name: string
    images: Array<{
      url: string
      height: number
      width: number
    }>
    release_date: string
  }
  artists: Array<{
    id: string
    name: string
    external_urls: {
      spotify: string
    }
  }>
  duration_ms: number
  popularity: number
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  release_date: string
  total_tracks: number
  external_urls: {
    spotify: string
  }
  artists: Array<{
    id: string
    name: string
  }>
  tracks: {
    items: SpotifyTrack[]
  }
}

export interface SpotifyArtist {
  id: string
  name: string
  images: Array<{
    url: string
    height: number
    width: number
  }>
  external_urls: {
    spotify: string
  }
  followers: {
    total: number
  }
  genres: string[]
  popularity: number
}

export interface SpotifyApiResponse<T> {
  items: T[]
  total: number
  limit: number
  offset: number
  next: string | null
  previous: string | null
}
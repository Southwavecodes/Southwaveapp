import { SpotifyTrack, SpotifyAlbum, SpotifyArtist, SpotifyApiResponse } from '@/types/spotify'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'

class SpotifyAPI {
  private accessToken: string | null = null
  private tokenExpiry: number = 0

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      if (!this.accessToken) {
  throw new Error('Access token is null')
}
return this.accessToken

    }

    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      throw new Error('Spotify credentials not configured')
    }

    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: 'grant_type=client_credentials',
    })

    if (!response.ok) {
      throw new Error('Failed to get Spotify access token')
    }

    const data = await response.json()
    this.accessToken = data.access_token
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000 // 1 minute buffer

    return this.accessToken
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const token = await this.getAccessToken()
    
    const response = await fetch(`${SPOTIFY_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Spotify API request failed: ${response.statusText}`)
    }

    return response.json()
  }

  async getArtist(artistId: string): Promise<SpotifyArtist> {
    return this.makeRequest(`/artists/${artistId}`)
  }

  async getArtistAlbums(artistId: string, limit = 20): Promise<SpotifyApiResponse<SpotifyAlbum>> {
    return this.makeRequest(`/artists/${artistId}/albums?limit=${limit}&include_groups=album,single`)
  }

  async getArtistTopTracks(artistId: string, market = 'US'): Promise<{ tracks: SpotifyTrack[] }> {
    return this.makeRequest(`/artists/${artistId}/top-tracks?market=${market}`)
  }

  async getAlbum(albumId: string): Promise<SpotifyAlbum> {
    return this.makeRequest(`/albums/${albumId}`)
  }

  async searchTracks(query: string, limit = 10): Promise<SpotifyApiResponse<SpotifyTrack>> {
    const encodedQuery = encodeURIComponent(query)
    const data = await this.makeRequest(`/search?q=${encodedQuery}&type=track&limit=${limit}`)
    return data.tracks
  }
}

export const spotify = new SpotifyAPI()

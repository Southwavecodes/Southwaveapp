'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, ExternalLink, Ticket } from 'lucide-react'

interface Concert {
  id: string
  venue: string
  city: string
  country: string
  date: string
  time: string
  ticketUrl: string
  soldOut?: boolean
  festivalName?: string
  description?: string
  image?: string
}

export default function ConcertsPage() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming')

  const concerts: Concert[] = [
    {
      id: 'concert-1',
      venue: 'Electronic Music Festival',
      city: 'Miami',
      country: 'USA',
      date: '2024-03-15',
      time: '22:00',
      ticketUrl: 'https://tickets.example.com/southwave-miami',
      festivalName: 'Ultra Music Festival',
      description: 'Main stage performance at one of the world\'s premier electronic music festivals',
      image: '/images/concert-miami.jpg',
    },
    {
      id: 'concert-2',
      venue: 'Red Rocks Amphitheatre',
      city: 'Morrison, CO',
      country: 'USA',
      date: '2024-04-20',
      time: '20:00',
      ticketUrl: 'https://tickets.example.com/southwave-redrocks',
      description: 'Special acoustic set under the stars at the iconic Red Rocks',
      image: '/images/concert-redrocks.jpg',
    },
    {
      id: 'concert-3',
      venue: 'Fabric',
      city: 'London',
      country: 'UK',
      date: '2024-05-05',
      time: '23:00',
      ticketUrl: 'https://tickets.example.com/southwave-london',
      description: 'Intimate club performance in the legendary Room 1',
      image: '/images/concert-london.jpg',
    },
    {
      id: 'concert-4',
      venue: 'Berghain',
      city: 'Berlin',
      country: 'Germany',
      date: '2024-05-18',
      time: '01:00',
      ticketUrl: 'https://tickets.example.com/southwave-berlin',
      soldOut: true,
      description: 'Extended DJ set at the world\'s most famous techno club',
      image: '/images/concert-berlin.jpg',
    },
    {
      id: 'concert-5',
      venue: 'Coachella Valley Music Festival',
      city: 'Indio, CA',
      country: 'USA',
      date: '2024-04-12',
      time: '18:30',
      ticketUrl: 'https://coachella.com',
      festivalName: 'Coachella',
      description: 'Sahara Tent performance featuring new unreleased tracks',
      image: '/images/concert-coachella.jpg',
    },
    // Past concerts
    {
      id: 'concert-past-1',
      venue: 'Warehouse Project',
      city: 'Manchester',
      country: 'UK',
      date: '2023-12-31',
      time: '23:59',
      ticketUrl: '#',
      description: 'New Year\'s Eve headline performance',
      image: '/images/concert-manchester.jpg',
    },
    {
      id: 'concert-past-2',
      venue: 'Awakenings Festival',
      city: 'Amsterdam',
      country: 'Netherlands',
      date: '2023-10-15',
      time: '16:00',
      ticketUrl: '#',
      festivalName: 'Awakenings',
      description: 'Techno showcase at Europe\'s premier electronic festival',
      image: '/images/concert-amsterdam.jpg',
    },
  ]

  const currentDate = new Date()
  const upcomingConcerts = concerts.filter(concert => new Date(concert.date) >= currentDate)
  const pastConcerts = concerts.filter(concert => new Date(concert.date) < currentDate)

  const getFilteredConcerts = () => {
    switch (selectedFilter) {
      case 'upcoming':
        return upcomingConcerts
      case 'past':
        return pastConcerts
      default:
        return concerts
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
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
            Live Shows
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience Southwave live at venues and festivals around the world
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4 bg-white/10 p-2 rounded-full">
            {[
              { key: 'upcoming', label: `Upcoming (${upcomingConcerts.length})` },
              { key: 'past', label: `Past Shows (${pastConcerts.length})` },
              { key: 'all', label: 'All Shows' },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedFilter(filter.key as any)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedFilter === filter.key
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Concerts List */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          {getFilteredConcerts().length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <Calendar size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-xl">No concerts found for the selected filter</p>
            </div>
          ) : (
            getFilteredConcerts()
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((concert, index) => (
                <motion.div
                  key={concert.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`music-card rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 ${
                    new Date(concert.date) < currentDate ? 'opacity-75' : ''
                  }`}
                >
                  {concert.image && (
                    <div className="w-full md:w-32 h-32 relative rounded-lg overflow-hidden">
                      <img
                        src={concert.image}
                        alt={`${concert.venue} concert`}
                        className="w-full h-full object-cover"
                      />
                      {concert.soldOut && (
                        <div className="absolute inset-0 bg-red-600/80 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">SOLD OUT</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    {concert.festivalName && (
                      <div className="inline-block bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {concert.festivalName}
                      </div>
                    )}
                    
                    <h3 className="text-white font-bold text-xl">{concert.venue}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-gray-300">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2" />
                        <span>{concert.city}, {concert.country}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        <span>{formatDate(concert.date)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        <span>{formatTime(concert.time)}</span>
                      </div>
                    </div>

                    {concert.description && (
                      <p className="text-gray-400 text-sm">{concert.description}</p>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    {new Date(concert.date) >= currentDate ? (
                      <>
                        {concert.soldOut ? (
                          <button
                            disabled
                            className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold cursor-not-allowed"
                          >
                            SOLD OUT
                          </button>
                        ) : (
                          <a
                            href={concert.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                          >
                            <Ticket size={20} className="mr-2" />
                            Get Tickets
                          </a>
                        )}
                      </>
                    ) : (
                      <div className="px-6 py-3 bg-gray-600 text-gray-300 rounded-lg font-semibold text-center">
                        Past Event
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
          )}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="music-card rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Never Miss a Show
            </h3>
            <p className="text-gray-300 mb-6">
              Subscribe to get notified about new tour dates and exclusive presale access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-primary-400"
              />
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
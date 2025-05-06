'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import TrackingForm from '@/components/TrackingForm'
import TrackingResult from '@/components/TrackingResult'
import { trackShipment, TrackingInfo } from '@/lib/api'

function TrackingContent() {
  const searchParams = useSearchParams()
  const trackingParam = searchParams.get('tracking')
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  
  useEffect(() => {
    const fetchTrackingInfo = async () => {
      if (!trackingParam) return
      
      setIsLoading(true)
      setError('')
      
      try {
        const info = await trackShipment(trackingParam)
        setTrackingInfo(info)
      } catch (error) {
        console.error('Error tracking shipment:', error)
        setError('Numéro de suivi invalide ou colis introuvable')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchTrackingInfo()
  }, [trackingParam])
  
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
        Suivi de votre colis
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        Entrez votre numéro de suivi pour connaître l&apos;état actuel de votre colis.
      </p>
      
      <TrackingForm />
      
      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement des informations...</p>
        </div>
      )}
      
      {error && !isLoading && (
        <div className="max-w-3xl mx-auto mt-8 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {trackingInfo && !isLoading && (
        <div className="max-w-3xl mx-auto mt-8">
          <TrackingResult trackingInfo={trackingInfo} />
        </div>
      )}
    </div>
  )
}

export default function TrackingPage() {
  return (
    <Suspense fallback={
      <div className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Chargement...</p>
      </div>
    }>
      <TrackingContent />
    </Suspense>
  )
}
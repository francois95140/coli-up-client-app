'use client'

import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import { trackShipment, TrackingInfo } from '@/lib/api'
import TrackingResult from './TrackingResult'

export default function TrackingForm() {
  const [trackingCode, setTrackingCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!trackingCode) {
      setError('Veuillez saisir un numéro de suivi')
      return
    }
    
    setIsLoading(true)
    setError('')
    
    try {
      const info = await trackShipment(trackingCode)
      setTrackingInfo(info)
    } catch (error) {
      console.error('Error tracking shipment:', error)
      setError('Numéro de suivi invalide ou colis introuvable')
      setTrackingInfo(null)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Suivre votre colis</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              label="Numéro de suivi"
              id="tracking-code"
              name="trackingCode"
              value={trackingCode}
              onChange={(e) => setTrackingCode(e.target.value)}
              error={error}
              placeholder="Ex: AF123456"
              className="mb-0 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Rechercher
            </Button>
          </div>
        </div>
      </form>
      
      {trackingInfo && <TrackingResult trackingInfo={trackingInfo} />}
    </div>
  )
}
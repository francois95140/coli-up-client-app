'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const trackingCode = searchParams.get('tracking')
  
  if (!trackingCode) {
    return (
      <div className="py-12 text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          Erreur
        </h1>
        <p className="text-gray-600 mb-8">
          Aucun numéro de suivi n&apos;a été trouvé. Veuillez réessayer votre expédition.
        </p>
        <Link href="/expedition">
          <Button>Retour à l&apos;expédition</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="py-12 max-w-2xl mx-auto text-center">
      <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Votre demande a été prise en compte
      </h1>
      
      <p className="text-gray-600 mb-8">
        Nous avons bien reçu votre demande d&apos;expédition. Votre colis sera traité dans les plus brefs délais.
      </p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          Votre numéro de suivi
        </h2>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-2xl font-mono font-bold text-blue-600">{trackingCode}</p>
        </div>
        <p className="text-sm text-gray-600">
          Conservez ce numéro pour suivre l&apos;état de votre colis à tout moment.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href={`/suivi?tracking=${trackingCode}`}>
          <Button>
            Suivre mon colis
          </Button>
        </Link>
        <Link href="/">
          <Button variant="outline">
            Retour à l&apos;accueil
          </Button>
        </Link>
      </div>
    </div>
  )
}
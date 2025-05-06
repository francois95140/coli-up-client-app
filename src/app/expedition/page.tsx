import ShippingForm from '@/components/ShippingForm'

export default function ExpeditionPage() {
  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Expédier un colis vers l&apos;Afrique
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
        Remplissez le formulaire ci-dessous pour envoyer votre colis. 
        Vous recevrez un numéro de suivi pour suivre votre expédition en temps réel.
      </p>
      
      <ShippingForm />
    </div>
  )
}
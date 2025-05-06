import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <section className="py-12 md:py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
          Envoyez vos colis vers l&apos;Afrique en 3 minutes
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Service rapide, sécurisé et fiable pour vos expéditions vers le continent africain
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/expedition" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors shadow-md"
          >
            Faire une expédition
          </Link>
          <Link 
            href="/suivi" 
            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-3 px-6 rounded-lg border border-blue-600 transition-colors"
          >
            Suivre un colis
          </Link>
        </div>
      </section>

      <section className="py-12 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Pourquoi choisir notre service ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Rapide</h3>
            <p className="text-gray-600">Expédition par avion ou bateau selon vos besoins et votre budget.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Sécurisé</h3>
            <p className="text-gray-600">Suivi en temps réel de vos colis jusqu'à leur destination finale.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-blue-600">Économique</h3>
            <p className="text-gray-600">Tarifs compétitifs adaptés à tous types de colis et destinations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

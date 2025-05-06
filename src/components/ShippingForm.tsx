'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from './ui/Input'
import Select from './ui/Select'
import Button from './ui/Button'
import { createShipment } from '@/lib/api'

export default function ShippingForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState({
    sender: {
      name: '',
      phone: '',
      email: ''
    },
    recipient: {
      name: '',
      phone: '',
      address: '',
      country: ''
    },
    package: {
      weight: '',
      volume: '',
      transportMode: 'air'
    }
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Handle nested form structure
    if (name.includes('.')) {
      const [section, field] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    // Validate sender
    if (!formData.sender.name) newErrors['sender.name'] = 'Le nom est requis'
    if (!formData.sender.phone) newErrors['sender.phone'] = 'Le téléphone est requis'
    if (!formData.sender.email) newErrors['sender.email'] = 'L\'email est requis'
    else if (!/\S+@\S+\.\S+/.test(formData.sender.email)) {
      newErrors['sender.email'] = 'Email invalide'
    }
    
    // Validate recipient
    if (!formData.recipient.name) newErrors['recipient.name'] = 'Le nom est requis'
    if (!formData.recipient.phone) newErrors['recipient.phone'] = 'Le téléphone est requis'
    if (!formData.recipient.address) newErrors['recipient.address'] = 'L\'adresse est requise'
    if (!formData.recipient.country) newErrors['recipient.country'] = 'Le pays est requis'
    
    // Validate package
    if (!formData.package.weight) newErrors['package.weight'] = 'Le poids est requis'
    if (!formData.package.volume) newErrors['package.volume'] = 'Le volume est requis'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      const response = await createShipment({
        ...formData,
        package: {
          ...formData.package,
          weight: parseFloat(formData.package.weight),
          volume: parseFloat(formData.package.volume),
          transportMode: formData.package.transportMode as 'air' | 'sea'
        }
      })
      
      router.push(`/confirmation?tracking=${response.tracking_code}`)
    } catch (error) {
      console.error('Error creating shipment:', error)
      alert('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }
  
  const africanCountries = [
    { value: 'senegal', label: 'Sénégal' },
    { value: 'cote_divoire', label: 'Côte d\'Ivoire' },
    { value: 'cameroun', label: 'Cameroun' },
    { value: 'mali', label: 'Mali' },
    { value: 'guinee', label: 'Guinée' },
    { value: 'benin', label: 'Bénin' },
    { value: 'togo', label: 'Togo' },
    { value: 'nigeria', label: 'Nigeria' },
    { value: 'ghana', label: 'Ghana' },
    { value: 'maroc', label: 'Maroc' }
  ]
  
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations expéditeur</h2>
        <div className="space-y-4">
          <Input
            label="Nom complet"
            id="sender-name"
            name="sender.name"
            value={formData.sender.name}
            onChange={handleChange}
            error={errors['sender.name']}
            placeholder="Votre nom et prénom"
            required
          />
          
          <Input
            label="Téléphone"
            id="sender-phone"
            name="sender.phone"
            value={formData.sender.phone}
            onChange={handleChange}
            error={errors['sender.phone']}
            placeholder="+33 6 12 34 56 78"
            required
          />
          
          <Input
            label="Email"
            id="sender-email"
            name="sender.email"
            type="email"
            value={formData.sender.email}
            onChange={handleChange}
            error={errors['sender.email']}
            placeholder="votre@email.com"
            required
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations destinataire</h2>
        <div className="space-y-4">
          <Input
            label="Nom complet"
            id="recipient-name"
            name="recipient.name"
            value={formData.recipient.name}
            onChange={handleChange}
            error={errors['recipient.name']}
            placeholder="Nom et prénom du destinataire"
            required
          />
          
          <Input
            label="Téléphone"
            id="recipient-phone"
            name="recipient.phone"
            value={formData.recipient.phone}
            onChange={handleChange}
            error={errors['recipient.phone']}
            placeholder="Numéro de téléphone du destinataire"
            required
          />
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="recipient-address">
              Adresse complète
            </label>            
            <textarea
              id="recipient-address"
              name="recipient.address"
              value={formData.recipient.address}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${errors['recipient.address'] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
                text-black dark:text-white dark:bg-gray-700`}
              rows={3}
              placeholder="Adresse complète du destinataire"
              required
            />
            {errors['recipient.address'] && (
              <p className="mt-1 text-red-500 text-sm">{errors['recipient.address']}</p>
            )}
          </div>
          
          <Select
            label="Pays de destination"
            id="recipient-country"
            name="recipient.country"
            value={formData.recipient.country}
            onChange={handleChange}
            error={errors['recipient.country']}
            options={africanCountries}
            required
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informations colis</h2>
        <div className="space-y-4">
          <Input
            label="Poids (kg)"
            id="package-weight"
            name="package.weight"
            type="number"
            min="0.1"
            step="0.1"
            value={formData.package.weight}
            onChange={handleChange}
            error={errors['package.weight']}
            placeholder="Ex: 5.5"
            required
          />
          
          <Input
            label="Volume (m³)"
            id="package-volume"
            name="package.volume"
            type="number"
            min="0.01"
            step="0.01"
            value={formData.package.volume}
            onChange={handleChange}
            error={errors['package.volume']}
            placeholder="Ex: 0.25"
            required
          />
          
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Mode de transport
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="package.transportMode"
                  value="air"
                  checked={formData.package.transportMode === 'air'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Avion (plus rapide)</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="package.transportMode"
                  value="sea"
                  checked={formData.package.transportMode === 'sea'}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span>Bateau (moins cher)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          type="submit"
          isLoading={isLoading}
          className="px-8 py-3 text-lg"
        >
          Envoyer ma demande
        </Button>
      </div>
    </form>
  )
}
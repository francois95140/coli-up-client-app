// Types for our API
export interface ShipmentRequest {
  sender: {
    name: string
    phone: string
    email: string
  }
  recipient: {
    name: string
    phone: string
    address: string
    country: string
  }
  package: {
    weight: number
    volume: number
    transportMode: 'air' | 'sea'
  }
}

export interface ShipmentResponse {
  tracking_code: string
  status: 'pending'
  created_at: string
}

export interface TrackingInfo {
  tracking_code: string
  recipient: {
    name: string
    country: string
  }
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  history: {
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
    date: string
    location: string
    description: string
  }[]
}

// This is a mock API service
// In a real application, you would replace these with actual API calls

export async function createShipment(data: ShipmentRequest): Promise<ShipmentResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  console.log(data)

  // Simulate a successful response
  return {
    tracking_code: 'AF' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
    status: 'pending',
    created_at: new Date().toISOString()
  }
}

export async function trackShipment(trackingCode: string): Promise<TrackingInfo> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // For demo purposes, generate random tracking info
  // In a real app, this would come from your backend
  const statuses: ('pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled')[] = 
    ['pending', 'processing', 'shipped', 'delivered', 'cancelled']
  
  const currentStatusIndex = Math.min(
    Math.floor(Math.random() * statuses.length),
    statuses.length - 1
  )
  
  const currentStatus = statuses[currentStatusIndex]
  
  // Generate history based on current status
  const history = []
  for (let i = 0; i <= currentStatusIndex; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (currentStatusIndex - i))
    
    history.push({
      status: statuses[i],
      date: date.toISOString(),
      location: i === 0 ? 'Paris, France' : i === statuses.length - 1 ? 'Dakar, Sénégal' : 'En transit',
      description: getStatusDescription(statuses[i])
    })
  }
  
  return {
    tracking_code: trackingCode,
    recipient: {
      name: 'John Doe',
      country: 'Sénégal'
    },
    status: currentStatus,
    history
  }
}

function getStatusDescription(status: string): string {
  switch (status) {
    case 'pending':
      return 'Colis enregistré, en attente de traitement'
    case 'processing':
      return 'Colis en cours de traitement dans notre entrepôt'
    case 'shipped':
      return 'Colis expédié, en route vers sa destination'
    case 'delivered':
      return 'Colis livré au destinataire'
    case 'cancelled':
      return 'Expédition annulée'
    default:
      return 'Statut inconnu'
  }
}
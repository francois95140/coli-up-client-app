import { TrackingInfo } from '@/lib/api'
import Badge from './ui/Badge'

interface TrackingResultProps {
  trackingInfo: TrackingInfo
}

export default function TrackingResult({ trackingInfo }: TrackingResultProps) {
  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  // Calculate progress percentage based on status
  const getProgressPercentage = () => {
    const statuses = ['pending', 'processing', 'shipped', 'delivered']
    const currentIndex = statuses.indexOf(trackingInfo.status)
    
    if (currentIndex === -1 || trackingInfo.status === 'cancelled') return 0
    return (currentIndex / (statuses.length - 1)) * 100
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            Colis #{trackingInfo.tracking_code}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Destinataire: {trackingInfo.recipient.name}, {trackingInfo.recipient.country}
          </p>
        </div>
        <Badge status={trackingInfo.status} className="mt-2 md:mt-0" />
      </div>
      
      {trackingInfo.status !== 'cancelled' && (
        <div className="mb-8">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-300 dark:bg-blue-900">
                  Progression
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-400">
                  {getProgressPercentage()}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
              <div
                style={{ width: `${getProgressPercentage()}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 dark:bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>
      )}
      
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Historique</h3>
      <div className="space-y-4">
        {trackingInfo.history.map((event, index) => (
          <div key={index} className="border-l-2 pl-4 pb-2 border-blue-500">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                <Badge status={event.status} className="mr-2" />
                {event.location}
              </h4>
              <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(event.date)}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
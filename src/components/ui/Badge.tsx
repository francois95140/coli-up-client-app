import React from 'react'

interface BadgeProps {
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  className?: string
}

export default function Badge({ status, className = '' }: BadgeProps) {
  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      label: 'En attente'
    },
    processing: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      label: 'En traitement'
    },
    shipped: {
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      label: 'Expédié'
    },
    delivered: {
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      label: 'Livré'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
      label: 'Annulé'
    }
  }

  const config = statusConfig[status]

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {config.label}
    </span>
  )
}
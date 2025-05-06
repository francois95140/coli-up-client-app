import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor={props.id}>
        {label}
      </label>
      <input
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
        ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
        dark:bg-gray-700 text-black dark:text-white transition-colors ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-red-500 dark:text-red-400 text-sm">{error}</p>}
    </div>
  )
}
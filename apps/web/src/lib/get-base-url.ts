export function getApiBaseUrl() {
  if (typeof window !== 'undefined') {
    return process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001'
  }

  return process.env.INTERNAL_API_URL || 'http://localhost:3001'
}

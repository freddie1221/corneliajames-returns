import { useState, useEffect } from 'react'

/**
 * Custom hook to fetch return metadata based on the provided name.
 *
 * @param {string} name - The name parameter for fetching return metadata.
 * @returns {Object} An object containing the fetched data, loading state, and any error encountered.
 */
export default function useReturnMeta(name) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!name) {
      setLoading(false)
      setData(null)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/airtable/returns?name=${encodeURIComponent(name)}`)
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        setData(result.records[0].fields)

      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [name])

  return { data, loading, error }
}
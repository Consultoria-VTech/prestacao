/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AxiosRequestConfig } from 'axios'
import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
import Api, { ErrorData } from '../services/api/api'

type useFetchProps<Data, Error> = SWRResponse<Data, Error>

export const useFetch = <Data = any, Error = ErrorData>(
  url: string,
  fetchOptions?: SWRConfiguration,
  axiosRequestConfig?: AxiosRequestConfig,
  getResponseData?: boolean,
  noPagination?: boolean
): useFetchProps<Data, Error> => {
  const { data, error, revalidate, mutate, isValidating } = useSWR<Data, Error>(
    url,
    async url => {
      const response = await Api.get(url, axiosRequestConfig)

      if (getResponseData) return response

      if (noPagination) {
        return response.data.data
      }
      return response.data
    },
    fetchOptions
  )

  return { data, error, revalidate, mutate, isValidating }
}


// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { AxiosRequestConfig } from 'axios'
// import useSWR, { SWRConfiguration, SWRResponse } from 'swr'
// import Api, { ErrorData } from '../services/api/api'

// type useFetchProps<Data, Error> = SWRResponse<Data, Error>

// export const useFetch = <Data = any, Error = ErrorData>(
//   url: string,
//   fetchOptions?: SWRConfiguration,
//   axiosRequestConfig?: AxiosRequestConfig,
//   getResponseData?: boolean
// ): useFetchProps<Data, Error> => {
//   const { data, error, revalidate, mutate, isValidating } = useSWR<Data, Error>(
//     url,
//     async url => {
//       const response = await Api.get(url, axiosRequestConfig)

//       if (getResponseData) return response

//       return response.data
//     },
//     fetchOptions
//   )

//   return { data, error, revalidate, mutate, isValidating }
// }

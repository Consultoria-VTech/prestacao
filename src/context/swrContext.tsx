import * as React from 'react'
import { SWRConfig, SWRConfiguration } from 'swr'

const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: false,
}

export const SWRConfigurationProvider: React.FC = ({ children }) => (
  <SWRConfig value={swrConfig}>{children}</SWRConfig>
)

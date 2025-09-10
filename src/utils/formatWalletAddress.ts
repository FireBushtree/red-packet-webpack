export interface FormatWalletAddressOptions {
  prefixLength?: number
  suffixLength?: number
  separator?: string
}

export function formatWalletAddress(
  address: string,
  options: FormatWalletAddressOptions = {},
): string {
  if (!address || typeof address !== 'string') {
    throw new Error('Address must be a non-empty string')
  }

  const { prefixLength = 6, suffixLength = 4, separator = '...' } = options

  if (prefixLength < 0 || suffixLength < 0) {
    throw new Error('Prefix and suffix lengths must be non-negative')
  }

  if (prefixLength + suffixLength >= address.length) {
    return address
  }

  const prefix = address.slice(0, prefixLength)
  const suffix = suffixLength > 0 ? address.slice(-suffixLength) : ''

  return `${prefix}${separator}${suffix}`
}

export function isValidEthereumAddress(address: string): boolean {
  if (!address || typeof address !== 'string') {
    return false
  }

  const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/
  return ethereumAddressRegex.test(address)
}

export function formatEthereumAddress(
  address: string,
  options: FormatWalletAddressOptions = {},
): string {
  if (!isValidEthereumAddress(address)) {
    throw new Error('Invalid Ethereum address format')
  }

  return formatWalletAddress(address, options)
}

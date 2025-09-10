import {
  type FormatWalletAddressOptions,
  formatEthereumAddress,
  formatWalletAddress,
  isValidEthereumAddress,
} from '../../src/utils/formatWalletAddress'

describe('formatWalletAddress', () => {
  const mockAddress = '0x1234567890123456789012345678901234567890'

  describe('基础功能测试', () => {
    test('应该正确格式化钱包地址（默认参数）', () => {
      const result = formatWalletAddress(mockAddress)
      expect(result).toBe('0x1234...7890')
    })

    test('应该支持自定义前缀长度', () => {
      const options: FormatWalletAddressOptions = { prefixLength: 8 }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('0x123456...7890')
    })

    test('应该支持自定义后缀长度', () => {
      const options: FormatWalletAddressOptions = { suffixLength: 6 }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('0x1234...567890')
    })

    test('应该支持自定义分隔符', () => {
      const options: FormatWalletAddressOptions = { separator: '***' }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('0x1234***7890')
    })

    test('应该支持多个参数同时自定义', () => {
      const options: FormatWalletAddressOptions = {
        prefixLength: 10,
        suffixLength: 8,
        separator: '----',
      }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('0x12345678----34567890')
    })
  })

  describe('边界情况测试', () => {
    test('当前缀和后缀长度总和大于等于地址长度时，应该返回原地址', () => {
      const shortAddress = '0x123456'
      const options: FormatWalletAddressOptions = {
        prefixLength: 4,
        suffixLength: 4,
      }
      const result = formatWalletAddress(shortAddress, options)
      expect(result).toBe(shortAddress)
    })

    test('当前缀长度为0时，应该只显示后缀', () => {
      const options: FormatWalletAddressOptions = { prefixLength: 0 }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('...7890')
    })

    test('当后缀长度为0时，应该只显示前缀', () => {
      const options: FormatWalletAddressOptions = { suffixLength: 0 }
      const result = formatWalletAddress(mockAddress, options)
      expect(result).toBe('0x1234...')
    })
  })

  describe('错误处理测试', () => {
    test('当地址为空字符串时，应该抛出错误', () => {
      expect(() => formatWalletAddress('')).toThrow(
        'Address must be a non-empty string',
      )
    })

    test('当地址为null时，应该抛出错误', () => {
      expect(() => formatWalletAddress(null as any)).toThrow(
        'Address must be a non-empty string',
      )
    })

    test('当地址为undefined时，应该抛出错误', () => {
      expect(() => formatWalletAddress(undefined as any)).toThrow(
        'Address must be a non-empty string',
      )
    })

    test('当地址不是字符串时，应该抛出错误', () => {
      expect(() => formatWalletAddress(123 as any)).toThrow(
        'Address must be a non-empty string',
      )
    })

    test('当前缀长度为负数时，应该抛出错误', () => {
      const options: FormatWalletAddressOptions = { prefixLength: -1 }
      expect(() => formatWalletAddress(mockAddress, options)).toThrow(
        'Prefix and suffix lengths must be non-negative',
      )
    })

    test('当后缀长度为负数时，应该抛出错误', () => {
      const options: FormatWalletAddressOptions = { suffixLength: -1 }
      expect(() => formatWalletAddress(mockAddress, options)).toThrow(
        'Prefix and suffix lengths must be non-negative',
      )
    })
  })
})

describe('isValidEthereumAddress', () => {
  test('应该正确验证有效的以太坊地址', () => {
    const validAddresses = [
      '0x0000000000000000000000000000000000000000',
      '0x1234567890123456789012345678901234567890',
      '0xabcdefABCDEF1234567890123456789012345678',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    ]

    validAddresses.forEach((address) => {
      expect(isValidEthereumAddress(address)).toBe(true)
    })
  })

  test('应该正确识别无效的以太坊地址', () => {
    const invalidAddresses = [
      '', // 空字符串
      '0x123', // 太短
      '0x12345678901234567890123456789012345678901', // 太长
      '1234567890123456789012345678901234567890', // 缺少0x前缀
      '0xG234567890123456789012345678901234567890', // 包含无效字符
      '0x123456789012345678901234567890123456789Z', // 包含无效字符
      null,
      undefined,
      123,
    ]

    invalidAddresses.forEach((address) => {
      expect(isValidEthereumAddress(address as any)).toBe(false)
    })
  })
})

describe('formatEthereumAddress', () => {
  const validEthereumAddress = '0x1234567890123456789012345678901234567890'

  test('应该正确格式化有效的以太坊地址', () => {
    const result = formatEthereumAddress(validEthereumAddress)
    expect(result).toBe('0x1234...7890')
  })

  test('应该支持自定义选项格式化以太坊地址', () => {
    const options: FormatWalletAddressOptions = {
      prefixLength: 8,
      suffixLength: 6,
      separator: '----',
    }
    const result = formatEthereumAddress(validEthereumAddress, options)
    expect(result).toBe('0x123456----567890')
  })

  test('当地址格式无效时，应该抛出错误', () => {
    const invalidAddresses = [
      '0x123', // 太短
      '1234567890123456789012345678901234567890', // 缺少0x前缀
      '0xG234567890123456789012345678901234567890', // 包含无效字符
    ]

    invalidAddresses.forEach((address) => {
      expect(() => formatEthereumAddress(address)).toThrow(
        'Invalid Ethereum address format',
      )
    })
  })

  test('当传入空值时，应该抛出错误', () => {
    expect(() => formatEthereumAddress(null as any)).toThrow(
      'Invalid Ethereum address format',
    )
    expect(() => formatEthereumAddress(undefined as any)).toThrow(
      'Invalid Ethereum address format',
    )
    expect(() => formatEthereumAddress('')).toThrow(
      'Invalid Ethereum address format',
    )
  })
})

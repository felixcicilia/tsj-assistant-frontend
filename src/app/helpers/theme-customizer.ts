import {
  colorKeys,
  type ColorType,
  type CustomizerType,
} from '@components/customizer/data'
import { pascalCaseToKebabCase } from '../utils/change-casing'

export const rootVariablePrefix = '--ar-'

export const keyPrefix = 'theme-'

export const customizerConfigKey = 'AROUND_CONFIG_KEY'

export const getConfigFromStorage = () =>
  localStorage.getItem(customizerConfigKey)

export const setConfigToStorage = (value: string) =>
  localStorage.setItem(customizerConfigKey, value)

export const removeConfigFromStorage = () =>
  localStorage.removeItem(customizerConfigKey)

const getRGBHex = (e: string) => {
  let t = '0',
    r = '0',
    n = '0'
  return (
    4 == e.length
      ? ((t = '0x' + e[1] + e[1]),
        (r = '0x' + e[2] + e[2]),
        (n = '0x' + e[3] + e[3]))
      : 7 == e.length &&
        ((t = '0x' + e[1] + e[2]),
        (r = '0x' + e[3] + e[4]),
        (n = '0x' + e[5] + e[6])),
    +t + ',' + +r + ',' + +n
  )
}

const getHoverActiveOrBorderColor = (hex: string, change: number) => {
  const r = parseInt(hex.replace('#', ''), 16),
    n = Math.round(2.55 * change),
    o = (r >> 16) + n,
    a = ((r >> 8) & 255) + n,
    i = (255 & r) + n
  return (
    '#' +
    (
      16777216 +
      65536 * (o < 255 ? (o < 1 ? 0 : o) : 255) +
      256 * (a < 255 ? (a < 1 ? 0 : a) : 255) +
      (i < 255 ? (i < 1 ? 0 : i) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

export const changeFontLink = (link: string) => {
  const headLinkElement = document.getElementById('google-font')
  if (headLinkElement && headLinkElement instanceof HTMLLinkElement)
    headLinkElement.href = link
}

export const themeCustomizer = (
  item: Record<Partial<keyof CustomizerType>, string | number>
) => {
  const key: keyof CustomizerType = Object.keys(item)[0] as keyof CustomizerType
  const value = Object.values(item)[0]
  if (colorKeys.includes(key as ColorType['variant'])) {
    const colorValue = value as ColorType['hex']
    const themeColorAndVariants: Record<string, string> = {
      [keyPrefix + key]: colorValue,
    }
    themeColorAndVariants[keyPrefix + key + '-rgb'] = getRGBHex(colorValue)
    themeColorAndVariants[
      keyPrefix + key + '-btn-hover-active-border-bg-color'
    ] = getHoverActiveOrBorderColor(colorValue, -10)
    if (key === 'primary') {
      themeColorAndVariants[keyPrefix + 'theme-link-hover-color'] =
        getHoverActiveOrBorderColor(colorValue, -10)
      themeColorAndVariants[keyPrefix + 'theme-accordion-btn-active-icon'] =
        `url("data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='${colorValue.replace(/#/g, '%23')}'%3e%3cpath%20d='M.5%206.3c.6-.6%201.6-.6%202.3%200l9.3%209.3%209.3-9.3c.6-.6%201.6-.6%202.3%200%20.6.6.6%201.6%200%202.3L13.3%2018.8c-.6.6-1.6.6-2.3%200L.8%208.5c-.9-.8-.9-1.6-.3-2.2z'/%3e%3c/svg%3e")`
    }
    return themeColorAndVariants
  } else if (key === 'url') {
    const fontUrl = { [keyPrefix + 'font-' + key]: value }
    changeFontLink(String(value))
    return fontUrl
  } else if (['fontFamily', 'rootFontSize', 'bodyFontSize'].includes(key)) {
    return { [keyPrefix + pascalCaseToKebabCase(key)]: value }
  } else if (key === 'borderWidth') {
    return {
      [keyPrefix + pascalCaseToKebabCase(key)]: value + 'px',
      [keyPrefix + 'customizer-btns']: true,
    }
  } else if (key === 'roundedBase') {
    return {
      [keyPrefix + 'border-radius']: value + 'rem',
      [keyPrefix + 'customizer-btns']: true,
    }
  } else if (
    ['roundedSm', 'roundedLg', 'roundedXl', 'roundedXxl'].includes(key)
  ) {
    const kebabCaseString = pascalCaseToKebabCase(key)
    const splitString = kebabCaseString.split('-')
    const size = splitString[splitString.length - 1]
    return {
      [keyPrefix + 'border-radius-' + size]:
        `calc(var(${rootVariablePrefix}border-radius) * ${value})`,
      [keyPrefix + 'border-radius-' + size + 'multiplier']: value,
      [keyPrefix + 'customizer-btns']: true,
    }
  }

  return null
}

export const getDefaultConfigStringFromStorage = () => {
  let configString: string | undefined = undefined
  const foundItem = getConfigFromStorage()
  if (!foundItem) return undefined
  let preString: string = ''
  const customizerHeadStyle = document.getElementById('customizer-styles')

  configString = foundItem.replace(/null|\s*(?![A-Z])/g, '')
  customizerHeadStyle?.append(configString)
  const configObj = JSON.parse(foundItem)
  const getValue = (key: string) => {
    return configObj[key]
  }

  const defaultConfigFromStorage1 = `
    :root {
      ${getValue('theme-primary') ? `${rootVariablePrefix}primary: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary-rgb') ? `${rootVariablePrefix}primary-rgb: ${getValue('theme-primary-rgb')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}warning-rgb: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning-rgb') ? `${rootVariablePrefix}warning-rgb: ${getValue('theme-warning-rgb')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}info-rgb: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info-rgb') ? `${rootVariablePrefix}info-rgb: ${getValue('theme-info-rgb')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}success-rgb: ${getValue('success-info')};` : ''}
      ${getValue('theme-success-rgb') ? `${rootVariablePrefix}success-rgb: ${getValue('success-info-rgb')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}danger-rgb: ${getValue('danger-info')};` : ''}
      ${getValue('theme-danger-rgb') ? `${rootVariablePrefix}danger-rgb: ${getValue('danger-info-rgb')};` : ''}
      ${getValue('theme-font-family') ? `${rootVariablePrefix}body-font-family: ${getValue('theme-font-family')};` : ''}
      ${getValue('theme-root-font-size') ? `${rootVariablePrefix}root-font-size: ${getValue('theme-root-font-size')};` : ''}
      ${getValue('theme-body-font-size') ? `${rootVariablePrefix}body-font-size: ${getValue('theme-body-font-size')};` : ''}
      ${getValue('theme-border-width') ? `${rootVariablePrefix}border-width: ${getValue('theme-border-width')};` : ''}
      ${getValue('theme-border-radius') ? `${rootVariablePrefix}border-radius: ${getValue('theme-border-radius')};` : ''}
      ${getValue('theme-border-radius-sm') ? `${rootVariablePrefix}border-radius-sm: ${getValue('theme-border-radius-sm')};` : ''}
      ${getValue('theme-border-radius-lg') ? `${rootVariablePrefix}border-radius-lg: ${getValue('theme-border-radius-lg')};` : ''}
      ${getValue('theme-border-radius-xl') ? `${rootVariablePrefix}border-radius-xl: ${getValue('theme-border-radius-xl')};` : ''}
      ${getValue('theme-border-radius-xxl') ? `${rootVariablePrefix}border-radius-xxl: ${getValue('theme-border-radius-xxl')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}link-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}link-hover-color: ${getValue('theme-primary-btn-hover-active-border-bg-color')};` : ''}
    }
    .btn-primary {
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-bg: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-primary-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-primary-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-primary-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-primary-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-primary-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-primary-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-primary-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-disabled-bg: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-primary')};` : ''}
    }
    .btn-warning {
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-bg: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-warning-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-warning-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-warning-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-warning-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-warning-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-warning-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-warning-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-disabled-bg: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-warning')};` : ''}
    }
    .btn-info {
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-bg: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-info-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-info-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-info-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-info-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-info-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-info-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-info-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-disabled-bg: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-info')};` : ''}
    }
    .btn-success {
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-bg: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-success-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-success-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-success-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-success-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-success-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-success-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-success-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-disabled-bg: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-success')};` : ''}
    }
    .btn-danger {
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-bg: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-danger-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-danger-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-danger-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-danger-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-danger-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-danger-btn-hover-active-border-bg-color') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-danger-btn-hover-active-border-bg-color')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-disabled-bg: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-danger')};` : ''}
    }
    .btn-outline-primary {
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-disabled-color: ${getValue('theme-primary')};` : ''}
      ${getValue('theme-primary') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-primary')};` : ''}
    }
    .btn-outline-warning {
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-disabled-color: ${getValue('theme-warning')};` : ''}
      ${getValue('theme-warning') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-warning')};` : ''}
    }
    .btn-outline-info {
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-disabled-color: ${getValue('theme-info')};` : ''}
      ${getValue('theme-info') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-info')};` : ''}
    }
    .btn-outline-success {
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-disabled-color: ${getValue('theme-success')};` : ''}
      ${getValue('theme-success') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-success')};` : ''}
    }
    .btn-outline-danger {
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-border-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-hover-bg: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-hover-border-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-active-bg: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-active-border-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-disabled-color: ${getValue('theme-danger')};` : ''}
      ${getValue('theme-danger') ? `${rootVariablePrefix}btn-disabled-border-color: ${getValue('theme-danger')};` : ''}
    }
    .accordion-button:not(.collapsed)::after {
      ${getValue('theme-accordion-btn-active-icon') && `${rootVariablePrefix}accordion-btn-active-icon: ${getValue('theme-accordion-btn-active-icon')}`}
    }
`

  let tempString = defaultConfigFromStorage1
  tempString = defaultConfigFromStorage1.replace(/null|\s*(?![A-Z])/g, '')
  preString = ''

  tempString.split('}').map((e) => {
    if (-1 !== e.indexOf('{--')) preString += e
  })

  preString += '}'

  if (customizerHeadStyle) customizerHeadStyle.innerHTML = preString

  return { configString, preString }
}

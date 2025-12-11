export type CustomizerType = TypographyType &
  BorderRoundedType &
  Partial<Record<ColorType['variant'], ColorType['hex']>> & {
    preStyles: string | null
  }

export type ColorType = {
  name?: string
  hex: `#${string}`
  variant: 'primary' | 'warning' | 'info' | 'success' | 'danger'
}

type TypographyType = {
  url: string
  fontFamily: string
  rootFontSize: number
  bodyFontSize: number
}

type BorderRoundedType = {
  borderWidth: number
  roundedBase: number
  roundedSm: number
  roundedLg: number
  roundedXl: number
  roundedXxl: number
}

export const colors: ColorType[] = [
  {
    name: 'Primary',
    hex: '#448c74',
    variant: 'primary',
  },
  {
    name: 'Warning',
    hex: '#edcb50',
    variant: 'warning',
  },
  {
    name: 'Info',
    hex: '#3f7fca',
    variant: 'info',
  },
  {
    name: 'Success',
    hex: '#3fca90',
    variant: 'success',
  },
  {
    name: 'Danger',
    hex: '#ed5050',
    variant: 'danger',
  },
]

export const colorKeys = colors.map((color) => color.variant)

export const typography: TypographyType = {
  url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  fontFamily: "'Inter', sans-serif",
  rootFontSize: 1,
  bodyFontSize: 1,
}

export const rootFontSizes = [0.75, 0.875, 1, 1.05, 1.1, 1.15, 1.25, 1.375]
export const bodyFontSizes = [0.75, 0.875, 1, 1.15, 1.25, 1.375]

export const bordersNRounding: BorderRoundedType = {
  borderWidth: 1,
  roundedBase: 1,
  roundedSm: 0.75,
  roundedLg: 1.125,
  roundedXl: 1.5,
  roundedXxl: 2.25,
}

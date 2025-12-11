export function pascalCaseToKebabCase(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

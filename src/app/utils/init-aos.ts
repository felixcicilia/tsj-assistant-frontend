import AOS from 'aos'

export const initAOS = () => {
  setTimeout(() => {
    AOS.init()
  }, 100)
}

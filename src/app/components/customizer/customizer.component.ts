import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard'
import { Component, OnInit, inject, type TemplateRef } from '@angular/core'
import {
  changeFontLink,
  getConfigFromStorage,
  getDefaultConfigStringFromStorage,
  keyPrefix,
  removeConfigFromStorage,
  setConfigToStorage,
  themeCustomizer,
} from '@helpers/theme-customizer'
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import {
  bodyFontSizes,
  bordersNRounding,
  colors,
  type CustomizerType,
  rootFontSizes,
  typography,
} from './data'

@Component({
  selector: 'component-customizer',
  standalone: true,
  imports: [ClipboardModule],
  templateUrl: './customizer.component.html',
})
export class CustomizerComponent implements OnInit {
  offcanvasService = inject(NgbOffcanvas)
  modalService = inject(NgbModal)

  showCopiedButton = false
  isThemeCustomized = false

  preValue = ''

  colors = colors
  rootFontSizes = rootFontSizes
  bodyFontSizes = bodyFontSizes
  defaultConfig: CustomizerType = {
    ...colors.reduce((color, prev) => {
      return { ...color, ...{ [prev.variant]: prev.hex } }
    }, {}),
    ...typography,
    ...bordersNRounding,
    preStyles: null,
  }
  customizerConfig: CustomizerType = this.defaultConfig

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {
    const headElement = document.getElementsByTagName('head')[0]
    if (headElement instanceof HTMLHeadElement) {
      const createdStyleTag = document.createElement('style')
      createdStyleTag.setAttribute('id', 'customizer-styles')
      headElement.appendChild(createdStyleTag)
    }

    const savedConfig = getConfigFromStorage()
    if (savedConfig) {
      this.isThemeCustomized = true
      const objConfig: CustomizerType = JSON.parse(savedConfig)
      Object.keys(objConfig).forEach((key) => {
        key.replace(keyPrefix, '')
        this.customizerConfig[key as keyof CustomizerType] = objConfig[
          key as keyof CustomizerType
        ] as never
      })
      if (Object.hasOwn(objConfig, 'url')) changeFontLink(String(objConfig.url))
    }
    this.setPreString()
  }

  setPreString() {
    const defaultConfig = getDefaultConfigStringFromStorage()
    this.preValue = defaultConfig?.preString ?? ''
  }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', backdrop: false })
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, {
      modalDialogClass: 'modal-lg modal-dialog-scrollable',
    })
  }

  onChange(event: Event) {
    if (!this.isThemeCustomized) this.isThemeCustomized = true
    const newChange = {
      [(event.target as HTMLInputElement).name]: (
        event.target as HTMLInputElement
      ).value,
    } as any
    this.customizerConfig = { ...this.customizerConfig, ...newChange }
    this.customizerConfig = {
      ...this.customizerConfig,
      ...themeCustomizer(newChange),
    }
    setConfigToStorage(JSON.stringify(this.customizerConfig))
    this.setPreString()
  }

  copyStyles(content: HTMLPreElement) {
    this.clipboard.copy(content.innerText)
    this.showCopiedButton = true
    setTimeout(() => {
      this.showCopiedButton = false
    }, 2000)
  }

  resetConfig() {
    removeConfigFromStorage()
    this.isThemeCustomized = false
    window.location.reload()
  }
}

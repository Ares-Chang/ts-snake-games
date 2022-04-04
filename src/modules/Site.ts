/**
 * 控制场地，获取数据
 */
export default class Site {
  /**
   * 存储舞台场地信息
   */
  private element: HTMLElement
  constructor() {
    // 获取 main 元素
    this.element = document.getElementById('main')!
  }

  /**
   * 获取舞台地址 ClientWidth
   */
  get ClientWidth() {
    return this.element.clientWidth
  }
  /**
   * 获取舞台地址 ClientHeight
   */
  get ClientHeight() {
    return this.element.clientHeight
  }
}

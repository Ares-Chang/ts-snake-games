/**
 * 控制蛇的方法
 */
export default class Snake {
  /**
   * 存放蛇容器的 DOM
   */
  element: HTMLElement
  /**
   * 存放蛇头
   */
  head: HTMLElement
  /**
   * 存放蛇身体(包含蛇头)
   * HTMLCollection，会实时刷新
   */
  bodys: HTMLCollection
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    // 如果使用 querySelectorAll，内部元素改变，不会实时刷新，需要每次重新获取
    this.bodys = document.getElementById('snake')?.getElementsByTagName('div')!
  }

  /**
   * 获取蛇头坐标 X
   */
  get X() {
    return this.head.offsetLeft
  }
  /**
   * 获取蛇头坐标 Y
   */
  get Y() {
    return this.head.offsetTop
  }

  /**
   * 设置蛇头 X 轴坐标
   */
  set X(value: number) {
    this.head.style.left = `${value}px`
  }
  /**
   * 设置蛇头 Y 轴坐标
   */
  set Y(value: number) {
    this.head.style.top = `${value}px`
  }

  /**
   * 增加蛇身体
   */
  addBody() {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}

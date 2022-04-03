/**
 * 控制蛇的方法
 */
import Site from './Site'
import Food from './Food'
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
   * 存入场地信息
   */
  site: Site
  /**
   * 存入食物信息
   */
  food: Food

  /**
   * 存放蛇身体(包含蛇头)
   * HTMLCollection，会实时刷新
   */
  bodys: HTMLCollection
  constructor() {
    this.site = new Site()
    this.food = new Food()
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
    /**
     * 禁止水平反方向移动
     */
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetLeft === value) {
      if (value > this.X) {
        value = this.X - this.food.step
      } else if (value < this.X) {
        value = this.X + this.food.step
      }
    }
    this.changePlace('X', value)
  }
  /**
   * 设置蛇头 Y 轴坐标
   */
  set Y(value: number) {
    /**
     * 禁止垂直反方向移动
     */
    if (this.bodys[1] && (this.bodys[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - this.food.step
      } else if (value < this.Y) {
        value = this.Y + this.food.step
      }
    }
    this.changePlace('Y', value)
  }

  /**
   * 改变位置信息，并判断是否死亡
   * @param {String} type 注明更改类型，X 轴还是 Y 轴
   * @param {Number} value 更改数值
   */
  changePlace(type: string, value: number) {
    /**
     * 先移动身体，再移动头
     */
    if (this.bodys.length > 1) {
      this.moveBody()
    }

    if (type === 'X') {
      this.head.style.left = `${value}px`
    } else if (type === 'Y') {
      this.head.style.top = `${value}px`
    }

    if (this.isOver()) {
      throw '您已撞墙，游戏结束！'
    } else if (this.isKill()) {
      throw '您已自杀，游戏结束！'
    }
  }

  /**
   * 判别是否死亡
   * @returns {Boolean} 当前是否死亡
   */
  isOver(): boolean {
    if (this.X >= this.site.ClientWidth || this.X < 0) {
      return true
    } else if (this.Y >= this.site.ClientHeight || this.Y < 0) {
      return true
    }

    return false
  }

  /**
   * 检查是否撞向自己身体
   */
  isKill(): boolean {
    const [head, ...bodyList] = [...this.bodys]
    return bodyList.some(item => {
      if (
        this.X === (item as HTMLElement).offsetLeft &&
        this.Y === (item as HTMLElement).offsetTop
      ) {
        return true
      }
      return false
    })
  }

  /**
   * 增加蛇身体
   */
  addBody() {
    this.element.insertAdjacentHTML(
      'beforeend',
      '<div style="left: -9999px"></div>'
    )
  }
  /**
   * 移动身体
   */
  moveBody() {
    const bodyList = this.bodys
    for (let i = bodyList.length - 1; i > 0; i--) {
      const X = (bodyList[i - 1] as HTMLElement).offsetLeft
      const Y = (bodyList[i - 1] as HTMLElement).offsetTop

      ;(bodyList[i] as HTMLElement).style.left = `${X}px`
      ;(bodyList[i] as HTMLElement).style.top = `${Y}px`
    }
  }
}

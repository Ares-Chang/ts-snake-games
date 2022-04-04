import Site from './Site'
/**
 * 用于控制食物
 */
export default class Food {
  /**
   * 存储食物元素
   */
  private element: HTMLElement
  /**
   * 存储场地信息
   */
  private main: Site

  /**
   * 食物间距 及 蛇前进步符
   */
  step: number = 30

  constructor() {
    // 获取 food 元素并赋值给 element
    this.element = document.getElementById('food')! // ! 强调 food 元素一定会存在，不会为 null
    // 获取场地数据
    this.main = new Site()
  }

  /**
   * 获取食物 X 轴座标
   */
  get X() {
    return this.element.offsetLeft
  }
  /**
   * 获取食物 Y 轴座标
   */
  get Y() {
    return this.element.offsetTop
  }

  /**
   * 在场地内随机改变食物位置
   */
  change() {
    /**
     * 通过获取场地宽高（去除 padding）并减去食物自身大小，
     * 除与运动间距大小并向下取整，与随机数相乘获取最大阈值
     * 再通过 Math.round 四舍五入可能获取 0 与 最大值
     * 最后乘与运动间距，获取位置信息
     */
    const left =
      Math.round(
        Math.random() * Math.floor((this.main.ClientWidth - 20) / this.step)
      ) * this.step

    const top =
      Math.round(
        Math.random() * Math.floor((this.main.ClientHeight - 20) / this.step)
      ) * this.step

    // 设置位置信息
    this.element.style.left = `${left}px`
    this.element.style.top = `${top}px`
  }
}

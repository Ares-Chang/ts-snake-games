/**
 * 游戏控制器
 */

import Food from './Food' // 引入 Food 类
import Snake from './Snake' // 引入 Snake 类
import ScorePanel from './ScorePanel' // 引入 ScorePanel 类控制面板信息

export default class GameControl {
  private food: Food
  private snake: Snake
  private scorePanel: ScorePanel

  /**
   * 当前移动方向
   */
  private direction: string = ''
  /**
   * 标识当前是否生存
   */
  private isLive: boolean = true

  constructor() {
    this.food = new Food()
    this.snake = new Snake()
    this.scorePanel = new ScorePanel()
  }

  /**
   * 键盘事件指定 key：
   * 上: w, ArrowUp, Up(IE)
   * 下: s, ArrowDown, Down(IE)
   * 左: a, ArrowLeft, Left(IE)
   * 右: d, ArrowRight, Right(IE)
   */
  private KEYLIST: string[][] = [
    ['w', 'ArrowUp', 'Up'],
    ['s', 'ArrowDown', 'Down'],
    ['a', 'ArrowLeft', 'Left'],
    ['d', 'ArrowRight', 'Right']
  ]

  /**
   * 初始化游戏
   */
  init() {
    // 生成游戏并运行
    this.food.change()
    this.run()
    document.addEventListener('keydown', this.handleKeyDown)
  }

  /**
   * 键盘事件，监控用户操作
   */
  private handleKeyDown = (e: KeyboardEvent) => {
    const KEYLIST = this.KEYLIST.flat(2)
    if (KEYLIST.includes(e.key)) {
      this.direction = e.key
    }
  }

  /**
   * 控制蛇方向移动
   */
  private run() {
    // 方向标识
    const UP = this.KEYLIST[0]
    const DOWN = this.KEYLIST[1]
    const LEFT = this.KEYLIST[2]
    const RIGHT = this.KEYLIST[3]
    // 前进步符
    const step = this.food.step

    /**
     * 死亡后，抛出错误，游戏结束
     */
    try {
      // 控制运行方向
      if (UP.includes(this.direction)) {
        this.snake.Y -= step
      } else if (DOWN.includes(this.direction)) {
        this.snake.Y += step
      } else if (LEFT.includes(this.direction)) {
        this.snake.X -= step
      } else if (RIGHT.includes(this.direction)) {
        this.snake.X += step
      }
    } catch (error) {
      alert(error) // 弹窗提示
      this.isLive = false // 结束游戏状态
      this.rebirth() // 重新开始
    }

    this.eatFood(this.snake.X, this.snake.Y) // 判断吃掉食物并重置食物

    // 判断是否游戏开始 && 自动执行上一次运动状态
    this.isLive &&
      setTimeout(() => this.run(), 300 - (this.scorePanel.level - 1) * 30)
  }

  /**
   * 游戏结束，重新开始
   * 因为 run 函数会持续调用，不需要重新调用 init 开启游戏，否则会执行多个 setTimeout
   */
  rebirth() {
    // 重置游戏状态
    this.direction = ''
    this.isLive = true
    // 清空蛇状态
    this.snake.reset()
    this.scorePanel.clearAll()
    // 修改食物位置
    this.food.change()
  }

  /**
   * 判别是否吃到食物并重置食物
   * @param {Number} X 当前蛇 X 轴座标
   * @param {Number} Y 当前蛇 Y 轴座标
   */
  private eatFood(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
}

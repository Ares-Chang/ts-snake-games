/**
 * 游戏控制器
 */

import Food from './Food' // 引入 Food 类
import Snake from './Snake' // 引入 Snake 类
import ScorePanel from './ScorePanel' // 引入 ScorePanel 类控制面板信息

export default class GameControl {
  food: Food
  snake: Snake
  scorePanel: ScorePanel

  /**
   * 当前移动方向
   */
  direction: string = ''
  /**
   * 标识当前是否生存
   */
  isLive: boolean = true

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
  KEYLIST: string[][] = [
    ['w', 'ArrowUp', 'Up'],
    ['s', 'ArrowDown', 'Down'],
    ['a', 'ArrowLeft', 'Left'],
    ['d', 'ArrowRight', 'Right']
  ]

  /**
   * 初始化游戏
   */
  init() {
    // 重置游戏状态
    this.direction = ''
    this.isLive = true
    // 生成游戏并运行
    this.food.change()
    this.run()
    document.addEventListener('keydown', e => this.handleKeyDown(e))
  }

  /**
   * 键盘事件，监控用户操作
   */
  handleKeyDown(e: KeyboardEvent) {
    const KEYLIST = this.KEYLIST.flat(2)
    if (KEYLIST.includes(e.key)) {
      this.direction = e.key
    }
  }

  /**
   * 控制蛇方向移动
   */
  run() {
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
    }

    if (this.eatFood(this.snake.X, this.snake.Y)) {
    }

    // 判断是否游戏开始 && 自动执行上一次运动状态
    this.isLive &&
      setTimeout(() => this.run(), 300 - (this.scorePanel.level - 1) * 30)
  }

  /**
   * 判别是否吃到食物
   * @param {Number} X 当前蛇 X 轴座标
   * @param {Number} Y 当前蛇 Y 轴座标
   * @returns {Boolean} 当前是否吃到食物
   */
  eatFood(X: number, Y: number): boolean {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change()
      this.scorePanel.addScore()
      this.snake.addBody()
      return true
    }
    return true
  }
}

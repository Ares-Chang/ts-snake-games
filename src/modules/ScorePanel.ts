/**
 * 用于控制记分牌
 */
export default class ScorePanel {
  score = 0 // 记录分数
  level = 1 // 记录等级

  private maxLevel = 10 // 定义最高等级
  private upScore = 10 // 定义升级分数区间

  // 记录记分牌元素
  private scoreEle: HTMLElement
  private levelEle: HTMLElement

  constructor() {
    this.scoreEle = document.querySelector('#score-panel')!
    this.levelEle = document.querySelector('#level-panel')!
  }

  /**
   * 增加记分牌分数
   */
  addScore() {
    this.scoreEle.innerHTML = String(++this.score)
    // 满足条件，提升等级
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }

  /**
   * 增加记分牌等级
   */
  private levelUp() {
    if (this.level >= this.maxLevel) return false
    this.levelEle.innerHTML = String(++this.level)
  }

  /**
   * 游戏重新开始，
   * 清空计分牌分数及等级
   */
  clearAll() {
    this.score = 0
    this.level = 1
    this.scoreEle.innerHTML = '0'
    this.levelEle.innerHTML = '1'
  }
}

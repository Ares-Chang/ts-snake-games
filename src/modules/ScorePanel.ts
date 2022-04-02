/**
 * 用于控制记分牌
 */
export default class ScorePanel {
  score = 0 // 记录分数
  level = 1 // 记录等级

  maxLevel = 10 // 定义最高等级
  upScore = 20 // 定义升级分数区间

  // 记录记分牌元素
  scoreEle: HTMLElement
  levelEle: HTMLElement

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
  levelUp() {
    if (this.level >= this.maxLevel) return false
    this.levelEle.innerHTML = String(++this.level)
  }
}

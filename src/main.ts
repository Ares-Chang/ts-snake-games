import './style/index.less'

// 引入 Food 类
import Food from './modules/Food'

// 引入 ScorePanel 类控制面板信息
import ScorePanel from './modules/ScorePanel'

// 引入 Snake 类
import Snake from './modules/Snake'

const snake = new Snake()

const food = new Food()
food.change()

const scorePanel = new ScorePanel()
for (let i = 0; i < 60; i++) {
  scorePanel.addScore()
}

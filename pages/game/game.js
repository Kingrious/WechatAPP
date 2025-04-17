// game.js
Page({
  data: {
    timeLeft: 60,
    timeProgress: 100,
    score: 0,
    currentWord: '加载中...',
    currentRound: 1,
    totalRounds: 10,
    isPaused: false,
    correctWords: [],
    skippedWords: [],
    wordList: [
      '苹果', '电影院', '篮球', '游泳', '跳舞',
      '电脑', '手机', '冰箱', '电视', '微波炉',
      '火锅', '足球', '钢琴', '吉他', '滑板',
      '公园', '书店', '超市', '医院', '学校'
    ]
  },

  onLoad() {
    const gameConfig = wx.getStorageSync('gameConfig') || {
      category: 'daily',
      duration: 60,
      rounds: 10
    };
    
    this.setData({
      timeLeft: gameConfig.duration,
      totalRounds: gameConfig.rounds
    });
    
    this.initGame();
  },
  
  initGame() {
    // 随机选择一个词
    this.selectRandomWord();
    
    // 开始倒计时
    this.startTimer();
  },
  
  selectRandomWord() {
    const randomIndex = Math.floor(Math.random() * this.data.wordList.length);
    this.setData({
      currentWord: this.data.wordList[randomIndex]
    });
  },
  
  startTimer() {
    this.timer = setInterval(() => {
      if (this.data.isPaused) return;
      
      if (this.data.timeLeft > 0) {
        const newTimeLeft = this.data.timeLeft - 1;
        const progress = (newTimeLeft / this.data.totalRounds) * 100;
        
        this.setData({
          timeLeft: newTimeLeft,
          timeProgress: (newTimeLeft / this.data.timeLeft) * 100
        });
      } else {
        this.endGame();
      }
    }, 1000);
  },
  
  togglePause() {
    this.setData({
      isPaused: !this.data.isPaused
    });
  },
  
  markCorrect() {
    const { currentWord, score, correctWords, currentRound, totalRounds } = this.data;
    
    // 添加到正确列表
    correctWords.push(currentWord);
    
    this.setData({
      score: score + 1,
      correctWords: correctWords
    });
    
    this.nextRound();
  },
  
  skipWord() {
    const { currentWord, skippedWords } = this.data;
    
    // 添加到跳过列表
    skippedWords.push(currentWord);
    
    this.setData({
      skippedWords: skippedWords
    });
    
    this.nextRound();
  },
  
  nextRound() {
    const { currentRound, totalRounds } = this.data;
    
    if (currentRound < totalRounds) {
      this.setData({
        currentRound: currentRound + 1
      });
      
      this.selectRandomWord();
    } else {
      this.endGame();
    }
  },
  
  endGame() {
    clearInterval(this.timer);
    
    // 保存结果数据
    const gameResult = {
      score: this.data.score,
      correctWords: this.data.correctWords,
      skippedWords: this.data.skippedWords
    };
    
    wx.setStorageSync('gameResult', gameResult);
    
    // 导航到结果页面
    wx.navigateTo({
      url: '../result/result'
    });
  },
  
  onUnload() {
    clearInterval(this.timer);
  }
}) 
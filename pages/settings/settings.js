// settings.js
Page({
  data: {
    selectedCategory: 'daily',
    gameDuration: 60,
    rounds: 10
  },
  
  selectCategory(e) {
    this.setData({
      selectedCategory: e.currentTarget.dataset.category
    });
  },
  
  selectDuration(e) {
    this.setData({
      gameDuration: parseInt(e.currentTarget.dataset.duration)
    });
  },
  
  decreaseRounds() {
    if (this.data.rounds > 5) {
      this.setData({
        rounds: this.data.rounds - 1
      });
    }
  },
  
  increaseRounds() {
    if (this.data.rounds < 20) {
      this.setData({
        rounds: this.data.rounds + 1
      });
    }
  },
  
  startGame() {
    const gameConfig = {
      category: this.data.selectedCategory,
      duration: this.data.gameDuration,
      rounds: this.data.rounds
    };
    
    // 将游戏配置存入全局数据或缓存
    wx.setStorageSync('gameConfig', gameConfig);
    
    wx.navigateTo({
      url: '../game/game'
    });
  }
}) 
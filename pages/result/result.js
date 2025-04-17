// result.js
Page({
  data: {
    score: 0,
    correctWords: [],
    skippedWords: []
  },
  
  onLoad() {
    const gameResult = wx.getStorageSync('gameResult') || {
      score: 0,
      correctWords: [],
      skippedWords: []
    };
    
    this.setData({
      score: gameResult.score,
      correctWords: gameResult.correctWords,
      skippedWords: gameResult.skippedWords
    });
  },
  
  playAgain() {
    wx.navigateTo({
      url: '../settings/settings'
    });
  },
  
  goHome() {
    wx.reLaunch({
      url: '../index/index'
    });
  },
  
  onShareAppMessage() {
    return {
      title: `我在疯狂猜词中获得了${this.data.score}分，快来挑战我吧！`,
      path: '/pages/index/index'
    };
  }
}) 
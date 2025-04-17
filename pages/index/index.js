// index.js
Page({
  data: {
    
  },
  
  startGame() {
    wx.navigateTo({
      url: '../settings/settings'
    })
  },
  
  showRules() {
    wx.navigateTo({
      url: '../rules/rules'
    })
  },
  
  showSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none',
      duration: 2000
    })
  },
  
  showRanking() {
    wx.showToast({
      title: '排行榜功能开发中',
      icon: 'none',
      duration: 2000
    })
  }
})

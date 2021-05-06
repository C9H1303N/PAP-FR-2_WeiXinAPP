
const app = getApp()
Page({
  data: {
    username: "",
    password: ""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    wx.hideTabBar({})
  },
  onLoad: function () {
   
  },
 
 
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
 
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
 
  // 登录处理
  login: function () {
    var that = this;
    if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/token-auth', 
        method: 'POST',
        data: {
          username: that.data.username,
          password: that.data.password
        },
        success(res) {
          var data = res.data
          app.globalData.token = data.access_token
          console.log(data.code)
          if(data.code == undefined){
              wx.switchTab({
              url: '/pages/Mainpage/Mainpage',
            })
          }
          else{
            wx.showToast({
              title: '用户名或密码错误！',
            })
          }
        },
        fail(res){

        }
      })
    }
  }
})
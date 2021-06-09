// pages/Login/zhuce.js
const app = getApp()
var nums = 30;
var clock;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    email: '',
    password: '',
    checkpass: '',
    vertifycode: '',
    send_cd: false,
    vertify_word: '发送验证码'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
  },

  usernameInput: function(e) {
    this.setData({
      username: e.detail.value
    })

  },

  emailInput: function(e) {
    this.setData({
      email: e.detail.value
    })
  },

  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  checkpassInput: function(e) {
    this.setData({
      checkpass: e.detail.value
    })
  },

  vertifycodeInput: function(e) {
    this.setData({
      vertifycode: e.detail.value
    })
  },

  doLoop: function() {
    let that = this
    if(nums >= 0) {
      var now_word = nums+'s后可重新发送'
      that.setData({
        vertify_word: now_word,
      })
      nums--;
    }
    else {
      clearInterval(clock); //清除js定时器
      that.setData({
        vertify_word: '发送验证码',
        send_cd: false,
      })
      nums = 30
    }
  },
  
  vertify: function() {
    let that = this
    var myreg=/^(\w|(\.\w+))+@([a-zA-Z0-9_-]+\.)+(com|org|cn|net)+$/;  
    var t = myreg.test(this.data.email)
    if (t == false) {
      wx.showToast({
        title: '邮箱格式错误！',
      })
    }
    else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/create', 
        method: 'POST',
        data: {
          email: that.data.email,
        },
        success(res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '确认邮件发送成功',
            })
            that.setData({
              send_cd: true,
            })
            clock = setInterval(that.doLoop, 1000); //一秒执行一次
          }
          else {
            wx.showToast({
              title: '发送失败，请重试',
            })
          }
        },
        fail(res){
          wx.showToast({
            title: '连接错误',
          })
        }
      })
    }
  },

  register: function() {
    let that = this
    if (this.data.username.length == 0 || this.data.password.length == 0 || this.data.checkpass.length == 0 || this.data.vertifycode.length == 0 
      || this.data.email.length == 0 ) {
      wx.showToast({
        title: '输入内容不能为空',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.password.length <= 6 ||  this.data.password.length >= 16) {
      //用户名密码合法性检查
      wx.showToast({
        title: '密码不合法',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.password != this.data.checkpass){
      //用户名密码合法性检查
      wx.showToast({
        title: '密码与确认密码不一致',
        icon: 'none',
        duration: 2000
      })
    }
    else if ((this.data.username[0] >= '0' && this.data.username[0] <= '9') || this.data.username.length<=6 || this.data.username.length>=16) {
      wx.showToast({
        title: '用户名不合法',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/create', 
        method: 'PUT',
        data: {
          code: that.data.vertify,
          email: that.data.email,
          password: that.data.password,
          username: that.data.username
        },
        success(res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '注册成功',
            })
          }
          else {
            wx.showToast({
              title: '发送失败，请重试',
              icon: 'none',
            })
          }
        },
        fail(res){
          wx.showToast({
            title: '连接错误',        
            icon: 'none',
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
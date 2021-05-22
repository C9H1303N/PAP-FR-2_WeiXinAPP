const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    email: '',
    password: '',
    checkpass: '',
    vertifycode: ''
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
        url: 'https://pap2.zixfy.com/api/user/forget-password', 
        method: 'POST',
        data: {
          email: that.data.email,
        },
        success(res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '确认邮件发送成功',
            })
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

  changepass: function() {
    let that = this
    if (this.data.password.length == 0 || this.data.checkpass.length == 0 || this.data.vertifycode.length == 0 
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
    else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/forget-password', 
        method: 'PUT',
        data: {
          code: that.data.vertifycode,
          email: that.data.email,
          password: that.data.password,
        },
        success(res) {
          if (res.statusCode == 200) {
            wx.showToast({
              title: '重置密码成功',
            })
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
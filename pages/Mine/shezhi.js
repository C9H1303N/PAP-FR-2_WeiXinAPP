// pages/Mine/shezhi.js
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oldpass: '',
        newpass: '',
        checkpass: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    },
    exit: function() {
        wx.reLaunch({
            url: '/pages/Login/Login',
        })
    },

    InputOldPass: function(e) {
        this.setData({
            oldpass: e.detail.value
          })
    },

    InputNewPass: function(e) {
        this.setData({
            newpass: e.detail.value
          })
    },

    InputCheckPass: function(e) {
        this.setData({
            checkpass: e.detail.value
          })
    },

    changepass: function(e) {
        let that = this
        if (this.data.oldpass.length == 0 || this.data.newpass.length == 0 || this.data.checkpass.length == 0) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
                duration: 2000
              })
        }
        else if (this.data.newpass != this.data.checkpass) {
            wx.showToast({
                title: '密码与确认密码不相符',
                icon: 'none',
                duration: 2000
              })
        }
        else {
            wx.request({
                url: 'https://pap2.zixfy.com/api/user/change-password', 
                method: 'POST',
                data: {
                  'old-password': that.data.oldpass,
                  'new-password': that.data.newpass
                },
                header: {
                    'Authorization': `Bearer ${ app.globalData.token }`
                  },
                success(res) {
                    console.log(res)
                    if (res.statusCode == 200) {
                    wx.showToast({
                        title: '修改密码成功',
                        icon: 'none',
                        duration: 2000
                      })
                    }
                    else if (res.statusCode == 403) {
                        wx.showToast({
                            title: '旧密码错误',
                            icon: 'none',
                            duration: 2000
                          })
                    }
                    else {
                        wx.showToast({
                            title: '修改密码失败',
                            icon: 'none',
                            duration: 2000
                          })
                    }
                },
                fail(res){
                    wx.showToast({
                        title: '修改密码失败',
                        icon: 'none',
                        duration: 2000
                      })
                }
              })
        }
    }

})
// pages/Mine/Mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_photo:'/images/Images_Mine/student_he.jfif',
    user_name: '大家好我是何同学',
    guanzhu_sum:'105',
    fensi_sum:'305w',
    person_view:'热衷于前沿数码领域',
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tabbar: ['默认排序','发布时间','浏览数量','点赞数量']
  },

  jump_shezhi: function(e){
    wx.navigateTo({
      url: '/pages/Mine/shezhi',
    })
  },

  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    console.log(cur)
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
      if (cur == 0) {
        this.setData(
          {
            posts_key: postsData.postList,
          }
        );
      }
      else if (cur == 1) { //发布时间排序
          var have_list = postsData.postList
          have_list.sort(function(a,b) {
              var a_times=a.date.split(".")
              var b_times=b.date.split(".")
              //console.log(a_times)
              //console.log(b_times)
              if(Number(a_times[0]) == Number(b_times[0])) {
                if(Number(a_times[1]) == Number(b_times[1])) {
                  return Number(b_times[2])-Number(a_times[2])
                }
                else {
                  return Number(b_times[1])-Number(a_times[1])
                }
              }
              else {
                return Number(b_times[0])-Number(a_times[0])
              }
          });
          this.setData(
            {
              posts_key: have_list,
            }
          );
      }
      else if (cur == 2) { //浏览数量排序
        var have_list = postsData.postList
        have_list.sort(function(a,b) {
          return b.reading-a.reading
        });
        this.setData(
          {
            posts_key: have_list,
          }
        );
      }
      else if (cur == 3) { //点赞数量
        var have_list = postsData.postList
        have_list.sort(function(a,b) {
          return b.like-a.like
        });
        this.setData(
          {
            posts_key: have_list,
          }
        );
      }
    }
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

  }
})
var app = getApp()
var postsData = require('../../data/posts-data.js')
var person = require('../../data/user_sum.js')
var My_jiedu = require('../../data/my_jiedu.js')
var My_collection = require('../../data/mu_collection.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_photo:'/images/Images_Mine/default.png',
    user_name: '大家好我是何同学',
    guanzhu_sum:'105',
    fensi_sum:'305w',
    person_view:'热衷于前沿数码领域',
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tabbar: ['我的发布','我的收藏','关注列表','粉丝列表'],
    searchWord: "",
    old_searchword: ""
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


    // 对用户变量的更新
    var people = person.postList01;
    var temp_person;
    this.setData(
      {
        temp_person: people[1]
      }
    );


    let that = this;
    //  高度自适应



    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc,
        });
      }
    });


    this.setData(
      // 替换发现前端的数据
      {
        posts_key: My_jiedu.postList02,
        old_searchword: this.data.searchWord
      }
    );

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc,
        });
      }
    });
    wx.request({
      url: 'https://pap2.zixfy.com/api/user/profile',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
        console.log(res.data)
        that.setData(
          // 替换发现前端的数据
          {
            posts_key: My_jiedu.postList02,
            user_name: res.data.username,
            fensi_sum: res.data.total_fan,
            guanzhu_sum: res.data.total_post,
            person_view: res.data.email
          }
        );
      }
    });

    
  },

  // 会是因为这个函数的原因吗 ？
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    // 跳转到子页面，新闻详情界面
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId,
    })
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
    } 
    else {
      this.setData({
        currentTab: cur
      })
      if (cur == 0) {
        this.setData(
          {
            posts_key: My_jiedu.postList02,
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
      else if (cur == 2) { //我的收藏页面
        // var have_list = postsData.postList
        // have_list.sort(function(a,b) {
        //   return b.reading-a.reading
        // });
        this.setData(
          {
            posts_key: My_collection.postList03,
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

  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    // 跳转到子页面，新闻详情界面
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId,
    })
  },

  checkCor: function () {
    let that = this;
    if (that.data.currentTab > 3) {
      that.setData({
        scrollLeft: 300
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  },

  switchTab: function (e) {
    let that = this;
    // console.log("滚动切换标签",e)
    that.setData({
      currentTab: e.detail.current
    });
    that.checkCor();
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
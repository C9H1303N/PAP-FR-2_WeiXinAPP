// pages/Search/Search.js
var app = getApp()
var postsData
Page({

  /**
   * 页面的初始数据
   */

  

  data: {
    tabbar: ['默认排序','发布时间','收藏数量','点赞数量'],
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    searchWord: "",
    old_searchword: "",
    i: 1
  },

  onReady: function() {
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
        old_searchword: this.data.searchWord
      }
    );
  },
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
      url: 'https://pap2.zixfy.com/api/search/page/' + that.data.i + '?pindx=' + that.data.i + '&keywords=' + options.searchWord + '&interpretation=true',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        console.log(res.data)
        postsData = res.data.res
        wx.setStorage({
          key: 'paper',
          data: postsData
        })
        that.setData(
      // 替换发现前端的数据
          {
          posts_key: postsData,
          old_searchword: options.searchWord
          }
        );
      }
    });
    console.log(postsData)
    console.log(this.data.posts_key)
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  searchWordInput: function(e){
    this.setData({
      searchWord: e.detail.value
    })
  },
  back_main:function(e) {
    wx.navigateTo({
      url: 'pages/Mainpage/Mainpage',
    })
  },
  search: function(e){
    let word = this.data.searchWord
    if (word == ''){
      wx: wx.showToast({
        title: '请输入关键词'
      })
    }
    else {
      let that = this;
    //  高度自适应
      this.data.i = 1;
      wx.request({
      url: 'https://pap2.zixfy.com/api/search/page/' + that.data.i + '?pindx=' + that.data.i + '&keywords=' + word + '&interpretation=true',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        console.log(res.data)
        postsData = res.data.res
        wx.setStorage({
          key: 'paper1',
          data: postsData
        })
        that.setData(
      // 替换发现前端的数据
         {
          posts_key: postsData,
          old_searchword: word
        }
        );
      }
      })
      
    }
    this.setData({
      searchWord: ""
    })
  },
  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    console.log(postId)
    // 跳转到子页面，新闻详情界面
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId + '&page=1', //个人发布4， 个人收藏3，动态2，search 1, 主页0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  loadmore: function(){
    this.data.i = this.data.i + 1;
    let that = this;
    let word = this.data.old_searchword
    wx.request({
      url: 'https://pap2.zixfy.com/api/search/page/' + that.data.i + '?pindx=' + that.data.i + '&keywords=' + word + '&interpretation=true',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        console.log(res.data)
        if(Math.ceil(res.data.total_res/5) >= that.data.i){
          postsData = postsData.concat(res.data.res) 
        wx.setStorage({
          key: 'paper1',
          data: postsData
        })
        that.setData(
      // 替换发现前端的数据
          {
          posts_key: postsData
          }
        );
        }
        else {
          wx.showToast({
            title: '没有更多了！',
          })
        }
      }
    });
  },
  // 点击标题切换当前页时改变样式
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
            posts_key: postsData,
          }
        );
      }
      else if (cur == 1) { //发布时间排序
          console.log(postsData)
          var have_list = postsData
          have_list.sort(function(a,b) {
              console.log(a.created_at)
              var a_times=a.created_at.split("-")
              var b_times=b.created_at.split("-")
              console.log(a_times)
              console.log(b_times)
              if(Number(a_times[0]) == Number(b_times[0])) {
                if(Number(a_times[1]) == Number(b_times[1])) {
                  return -1
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
      else if (cur == 2) { //收藏数量排序
        var have_list = postsData
        have_list.sort(function(a,b) {
          return b.collect_num-a.collect_num
        });
        this.setData(
          {
            posts_key: have_list,
          }
        );
      }
      else if (cur == 3) { //点赞数量
        var have_list = postsData
        console.log(have_list)
        have_list.sort(function(a,b) {
          return b.like_num-a.like_num
        });
        this.setData(
          {
            posts_key: have_list,
          }
        );
      }
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
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

  // 滚动切换标签样式
  switchTab: function (e) {
    let that = this;
    // console.log("滚动切换标签",e)
    that.setData({
      currentTab: e.detail.current
    });
    that.checkCor();
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
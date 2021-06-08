var app = getApp()
var postsData
var nums = 2
var clock
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    user_photo:'',
    user_name: '',
    guanzhu_sum:'',
    fensi_sum:'',
    person_view:'',
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    tabbar: ['TA的发布','TA的收藏','关注列表','粉丝列表'],
    searchWord: "",
    old_searchword: "",
    now_name: "postItem",
    mine_fabu_num: 1,
    mine_collect_num: 1,
    mine_subs_num: 1,
    mine_fans_num: 1,
    id:'',
    check_work: '关注',
    loading: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {


    // 对用户变量的更新


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
  },
  doLoop: function() {
    let that = this
    if(nums >= 0) {
      nums--;
    }
    else {
      clearInterval(clock); //清除js定时器
      nums = 2
      this.setData({
        loading: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var idd = '';
    //  高度自适应
    console.log("options:")
    console.log(options)
    this.data.id = options.id;
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc,
        });
      }
    });
    postsData = wx.getStorageSync('paper')
    this.setData({
      loading: true,
      mine_fabu_num: 1,
      mine_collect_num: 1,
      mine_subs_num: 1,
      mine_fans_num: 1,
    })
    wx.request({
      url: 'https://pap2.zixfy.com/api/user/profile?user_id=' + this.data.id,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
        console.log(res.data)
        idd = res.data.id
        var strr = ''
        if(res.data.is_following) {
          strr = '取消关注'
        }
        else {
          strr = '关注'
        }
        that.setData(
          // 替换发现前端的数据
          {
            user_name: res.data.username,
            fensi_sum: res.data.total_fan,
            guanzhu_sum: res.data.total_post,
            person_view: res.data.email,
            check_work: strr,
            user_photo: res.data.icon
          }
        );
      }
    });
    wx.request({
      url: 'https://pap2.zixfy.com/api/post/'+this.data.id+'?pindx=' + this.data.mine_fabu_num,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
       // console.log("posts::::::::")
      //  console.log(res.data)
      var filter = new Array()
        for (var t in res.data.posts) {
          if (res.data.posts[t].type == 1) {
            filter.push(res.data.posts[t])
          }
        }
        console.log(filter)
        wx.setStorage({
          key: 'paper5',
          data: filter
        })
        that.setData(
          // 替换发现前端的数据
          {
            fabu_key: filter,
            posts_key: filter
          }
        );
      }
    });

    wx.request({
      url: 'https://pap2.zixfy.com/api/favorites/'+this.data.id+'?pindx=' + this.data.mine_collect_num,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
     //   console.log(res.data)
     var filter = new Array()
     for (var t in res.data.posts) {
       if (res.data.posts[t].type == 1) {
         filter.push(res.data.posts[t])
       }
     }
     wx.setStorage({
      key: 'paper6',
      data: filter
    })
        that.setData(
          // 替换发现前端的数据
          {
            collect_key: filter
          }
        );
      }
    });

    wx.request({
      url: 'https://pap2.zixfy.com/api/follower/'+this.data.id+'?page=' + this.data.mine_subs_num+"&page_size=9",
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
       // console.log(res.data)
        that.setData(
          // 替换发现前端的数据
          {
            follower_key: res.data.models
          }
        );
      }
    });

    wx.request({
      url: 'https://pap2.zixfy.com/api/fan/'+this.data.id+'?page=' + this.data.mine_fans_num+"&page_size=9",
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
       // console.log(res.data)
        that.setData(
          // 替换发现前端的数据
          {
            fan_key: res.data.models,
          }
        );
        
       nums = 2
       clock = setInterval(that.doLoop, 1000); //一秒执行一次
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
    console.log(postId)
    console.log(this.data.now_name)
    console.log(this.data.posts_key)
    if(this.data.now_name == "postItem"){
      // 跳转到子页面，新闻详情界面
      if (this.data.currentTab == 0) {
        wx.navigateTo({
          url: '/pages/posts/post-detail/post-detail?id='+postId+'&page=5', //个人发布4、个人收藏3，动态2，search 1, 主页0,
        })
      }
      else if (this.data.currentTab == 1) {
        wx.navigateTo({
          url: '/pages/posts/post-detail/post-detail?id='+postId+'&page=6', //个人发布4、个人收藏3，动态2，search 1, 主页0,
        })
      }
    }
    else{
      wx.navigateTo({
        url: '/pages/Otherspage/Otherspage?id=' + postId,
      })
    }
  },

  jump_shezhi: function(e){
    wx.navigateTo({
      url: '/pages/Mine/shezhi',
    })
  },

  swichNav: function (e) {
    
    console.log(this.data.posts_key)
    let cur = e.currentTarget.dataset.current;
    console.log(cur)
    if (this.data.currentTab == cur) {
      return false;
    } 
    else {
      console.log(this.data.loading)
      if (this.data.loading) {
        wx.showToast({
          title: '加载中，请稍候',
          icon: 'loading',
          duration: 2000
        })
        return false
      }
      this.setData({
        currentTab: cur
      })
      if (cur == 0) { //我的发布
        this.setData(
          {
            posts_key: this.data.fabu_key,
            now_name: "postItem"
          }
        );
      }
      else if (cur == 1) { //我的收藏
          this.setData(
            {
              posts_key: this.data.collect_key,
              now_name: "postItem"
            }
          );
      }
      else if (cur == 2) { //关注列表
        this.setData(
          {
            posts_key: this.data.follower_key,
            now_name: "postPerson"
          }
        );
      }
      else if (cur == 3) { //粉丝列表
        this.setData(
          {
            posts_key: this.data.fan_key,
            now_name: "postPerson"
          }
        );
      }
    }
  },

  follow_action: function() {
    
    let that = this;
    var idd = '';
    if (this.data.check_work === '取消关注') {
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/' + this.data.id + '/unfollow',
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'POST',
        success (res) {
          console.log("success")
        },
      })
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/profile?user_id=' + this.data.id,
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          console.log(res.data)
          var strr = ''
          if(res.data.is_following) {
            strr = '取消关注'
          }
          else {
            strr = '关注'
          }
          that.setData(
            // 替换发现前端的数据
            {
              user_name: res.data.username,
              fensi_sum: res.data.total_fan,
              guanzhu_sum: res.data.total_post,
              person_view: res.data.email,
              check_work: strr
            }
          );
        }
      });
      wx.request({
        url: 'https://pap2.zixfy.com/api/fan/'+this.data.id+'?page=' + this.data.mine_fans_num+"&page_size=9",
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
         // console.log(res.data)
          that.setData(
            // 替换发现前端的数据
            {
              fan_key: res.data.models,
            }
          );
          
         nums = 2
         clock = setInterval(that.doLoop, 1000); //一秒执行一次
        }
      });
      this.setData(
        {
          posts_key: this.data.fabu_key,
          now_name: "postItem",
          currentTab: 0
        }
      );
    }
    else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/' + this.data.id + '/follow',
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'POST',
        success (res) {
          console.log("success")
        },
      })
      wx.request({
        url: 'https://pap2.zixfy.com/api/user/profile?user_id=' + this.data.id,
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          console.log(res.data)
          var strr = ''
          if(res.data.is_following) {
            strr = '取消关注'
          }
          else {
            strr = '关注'
          }
          that.setData(
            // 替换发现前端的数据
            {
              user_name: res.data.username,
              fensi_sum: res.data.total_fan,
              guanzhu_sum: res.data.total_post,
              person_view: res.data.email,
              check_work: strr
            }
          );
        }
      });
      wx.request({
        url: 'https://pap2.zixfy.com/api/fan/'+this.data.id+'?page=' + this.data.mine_fans_num+"&page_size=9",
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
         // console.log(res.data)
          that.setData(
            // 替换发现前端的数据
            {
              fan_key: res.data.models,
            }
          );
          
         nums = 2
         clock = setInterval(that.doLoop, 1000); //一秒执行一次
        }
      });
      this.setData(
        {
          posts_key: this.data.fabu_key,
          now_name: "postItem",
          currentTab: 0
        }
      );
    }
  },
  chat_action: function(){
    wx.request({
      url: 'https://pap2.zixfy.com/api/add-usr-into-chat-list',
      data:{
        user_id: this.data.id
      },
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'POST',
      success (res){
        wx.showToast({
          title: '已加入私聊列表！',
        })
      }
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

  loadmore: function(){
    if (this.data.currentTab == 0) {
      this.data.mine_fabu_num = this.data.mine_fabu_num + 1;
      let that = this;
      let fabus = this.data.fabu_key
      wx.request({
        url: 'https://pap2.zixfy.com/api/post/'+this.data.id+'?pindx=' + this.data.mine_fabu_num,
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          if(Math.ceil(res.data.total_count/5) >= that.data.mine_fabu_num){
            var filter = new Array()
            for (var t in res.data.posts) {
              if (res.data.posts[t].type == 1) {
                filter.push(res.data.posts[t])
              }
            }
            fabus = fabus.concat(filter) 
            console.log(fabus)
            wx.setStorage({
              key: 'paper5',
              data: fabus
            })
            that.setData(
          // 替换发现前端的数据
              {
                posts_key: fabus,
                fabu_key: fabus
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
    }
    else if (this.data.currentTab == 1) {
      this.data.mine_collect_num = this.data.mine_collect_num + 1;
      let that = this;
      let collect = this.data.collect_key
      wx.request({
        url: 'https://pap2.zixfy.com/api/favorites/'+this.data.id+'?pindx=' + this.data.mine_collect_num,
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          if(Math.ceil(res.data.total_count/5) >= that.data.mine_collect_num){
            var filter = new Array()
            for (var t in res.data.posts) {
              if (res.data.posts[t].type == 1) {
                filter.push(res.data.posts[t])
              }
            }
            collect = collect.concat(filter) 
            wx.setStorage({
              key: 'paper6',
              data: collect
            })
            that.setData(
          // 替换发现前端的数据
              {
                posts_key: collect,
                fabu_key: collect
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
    }
    else if (this.data.currentTab == 2) {
      this.data.mine_subs_num = this.data.mine_subs_num + 1;
      let that = this;
      let subs = this.data.follower_key
      wx.request({
        url: 'https://pap2.zixfy.com/api/follower/'+this.data.id+'?page=' + this.data.mine_subs_num+"&page_size=9",
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          if(Math.ceil(res.data.models_all/5) >= that.data.mine_subs_num){
            subs = subs.concat(res.data.models) 
            that.setData(
          // 替换发现前端的数据
              {
                posts_key: subs,
                followers_key: subs
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
    }
    else if (this.data.currentTab == 3) {
      this.data.mine_fans_num = this.data.mine_fans_num + 1;
      let that = this;
      let subs = this.data.fans_key
      wx.request({
        url: 'https://pap2.zixfy.com/api/fan/'+this.data.id+'?page=' + this.data.mine_fans_num+"&page_size=9",
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {  
          if(Math.ceil(res.data.models_all/5) >= that.data.mine_fans_num){
            subs = subs.concat(res.data.models) 
            that.setData(
          // 替换发现前端的数据
              {
                posts_key: subs,
                fan_key: subs
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
    }

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
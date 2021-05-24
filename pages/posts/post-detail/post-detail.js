// pages/posts/post-detail/post-detail.js
var postsData
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id: 0,
    like: 0,
    collection: 0,
    maxLength: 100, // 收起时最大显示文字长度
    ellipsis: false, // 是否收缩
    contentShow: '',
    detailData: '',
    like_num: 0,
    collect_num: 0,
    comment_i: 1,
    page_num: 0
  },

  ellipsis: function () {
    //console.log(this.post_id)
    var ellipsis = !this.data.ellipsis;
    var contentShow;
    contentShow = this.data.detailData.content;
    var maxLength = this.data.maxLength;
    // 如果内容长度少于10，则不截取;否则当处于收起状态，截取7个文字并加上省略号
    console.log(contentShow.length)
    contentShow = (contentShow.length > maxLength && ellipsis) ? contentShow.substring(0, maxLength - 3) + "..." : contentShow;
    this.setData({
      contentShow: contentShow,
      ellipsis: ellipsis
    })
  },

  liking: function(e) {
    let that = this
    var id = this.data.detailData.id
    var sb = this.data.like_num
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/like',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {   
      }
    });
    sb = sb + 1
    this.setData({
      like: 1,
      like_num: sb
    })
    console.log(this.data.like_num)
  },
  
  unliking: function(e) {
    let that = this
    var id = this.data.detailData.id
    var sb = this.data.like_num
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/like',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
      }
    });
    sb=sb-1
    this.setData({
      like: 0,
      like_num: sb
    })
    console.log(this.data.like)
  },
  collecting: function(e) {
    let that = this
    var id = this.data.detailData.id
    var sb = this.data.collect_num
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/collect',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
      }
    });
    sb=sb+1
    this.data.collect_num = this.data.collect_num+1
    this.setData({
      collection: 1,
      collect_num: sb
    })
    console.log(this.data.collection)
  },
  uncollecting: function(e) {
    let that = this
    var id = this.data.detailData.id
    var sb = this.data.collect_num
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/collect',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
      }
    });
    sb=sb-1
    this.data.collect_num = this.data.collect_num-1
    this.setData({
      collection: 0,
      collect_num: sb
    })
    console.log(this.data.collection)
  },
  view_others:function(){
    wx.navigateTo({
      url: '/pages/Otherspage/Otherspage?id=' + this.data.detailData.paper.created_by.id,
    })
    console.log(this.data.detailData.paper.created_by.id)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //后期需要后端传
    let that = this
    var postId = options.id;
    this.data.post_id = postId;
    //console.log(postId)
    // 拿到数据文件对应id的数据元素
    postsData = wx.getStorageSync('paper')
    //console.log(postsData)
    for(var i = 0; i < postsData.length; i++){
      if(postsData[i].id == postId){
        var likk = 0
        var coll = 0
        if (postsData[i].is_like) {
          likk = 1
        }
        if (postsData[i].is_collect) {
          coll = 1
        }
        this.setData({
          detailData: postsData[i],
          like_num: postsData[i].like_num,
          collect_num: postsData[i].collect_num,
          like: likk,
          collection: coll
        })
        break;
      }
    }
    wx.request({
      url: 'https://pap2.zixfy.com/api/comment?micro_knowledge_id=' + postId + '&pindex=' + that.data.comment_i + '&psize=20',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        var comment_list = res.data.comment_list
        var father_comments = new Array()
        var reply_map = {}
        for (var comm in comment_list) {
          var item = comment_list[comm]
          let date = new Date(item.created_at)
          console.log(date)
          item.year = date.getFullYear()
          item.month = date.getMonth() + 1
          item.date = date.getDate()
          item.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
          item.minute =  date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
          if (item.parent_comment_id == undefined) {
            father_comments.push(item)
          }
          else {
            var id = item.parent_comment_id
            if (reply_map[id] != undefined) {
              var arr = reply_map[id]
              arr.push(item)
              reply_map[id] = arr
            }
            else {
              var arr = new Array()
              arr.push(item)
              reply_map[id] = arr
            }
          }
        }
        that.setData({
          comments_key: father_comments,
          reply_map: reply_map,
          page_num: res.data.page_count
        })
        console.log(father_comments)
        console.log(reply_map)
        
      }
    })
    // 数据绑定
  },

  loadmore: function() {
    let that = this
    this.data.comment_i = this.data.comment_i + 1
    if (this.data.comment_i> this.data.page_num) {
      wx.showToast({
        title: '没有更多了！',
      })
    }
    else {
      wx.request({
        url: 'https://pap2.zixfy.com/api/comment?micro_knowledge_id=' + postId + '&pindex=' + that.data.comment_i + '&psize=20',
        header: {
          'Authorization': `Bearer ${ app.globalData.token }`
        },
        method: 'GET',
        success (res) {
          var comment_list = res.data.comment_list
          var father_comments = that.data.comments_key
          var reply_map = that.data.reply_map
          for (var comm in comment_list) {
            var item = comment_list[comm]
            let date = new Date(item.created_at)
            console.log(date)
            item.year = date.getFullYear()
            item.month = date.getMonth() + 1
            item.date = date.getDate()
            item.hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            item.minute =  date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            if (item.parent_comment_id == undefined) {
              father_comments.push(item)
            }
            else {
              var id = item.parent_comment_id
              if (reply_map[id] != undefined) {
                var arr = reply_map[id]
                arr.push(item)
                reply_map[id] = arr
              }
              else {
                var arr = new Array()
                arr.push(item)
                reply_map[id] = arr
              }
            }
          }
          that.setData({
            comments_key: father_comments,
            reply_map: reply_map
          })
          console.log(father_comments)
          console.log(reply_map)
          
        }
      })
    }

  },

  jump_pinglun: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search_detail_command',
    })
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
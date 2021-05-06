// pages/Search/Search_detail.js
var postsData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    post_id: 0,
    like: 0,
    collection: 0,
    maxLength: 100, // 收起时最大显示文字长度
    //ellipsis: false, // 是否收缩
    contentShow: '',
    detailData: ''
  },

  /*
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
  */

  liking: function(e) {
    let that = this
    this.setData({
      like: 1
    })
    console.log(this.data.like)
  },
  unliking: function(e) {
    let that = this
    this.setData({
      like: 0
    })
    console.log(this.data.like)
  },
  collecting: function(e) {
    let that = this
    this.setData({
      collection: 1
    })
    console.log(this.data.collection)
  },
  uncollecting: function(e) {
    let that = this
    this.setData({
      collection: 0
    })
    console.log(this.data.collection)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //后期需要后端传
    this.post_id = options.id;
    var postId = options.id;
    //console.log(postId)
    // 拿到数据文件对应id的数据元素
    postsData = wx.getStorageSync('paper1')
    //console.log(postsData)
    for(var i = 0; i < postsData.length; i++){
      if(postsData[i].id == this.post_id){
        console.log(postsData[i])
        this.setData({
          detailData: postsData[i],
          like: postsData[i].is_like,
          collection: postsData[i].is_collect
        })
        break;
      }
    }
    // 数据绑定
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
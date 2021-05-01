// pages/posts/post-detail/post-detail.js
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
    ellipsis: false, // 是否收缩
    contentShow: '',
    detailData: ''
  },

  ellipsis: function () {
    //console.log(this.post_id)
    var ellipsis = !this.data.ellipsis;
    var contentShow;
   contentShow = "我们提出了一个统一的框架来理解来自自中心RGB相机的原始图像序列中的3D手和对象交互。给定一个单一的RGB图像，我们的模型联合估计3D手和物体的姿态，建模它们的交互，并通过一个神经网络的单一前馈识别对象和动作类。我们提出了一个单一的体系结构，它不依赖于外部检测算法，而是在单个图像上进行端到端训练。我们进一步合并和传播信息在时域推断交互手和物体轨迹和识别行动。完整的模型以帧序列作为输入，并输出每帧3D手和物体姿态预测，以及整个序列的对象和动作类别的估计。与处理深度数据和ground-truth注释的方法相比，我们演示了我们算法的最新性能。"
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
    postsData = wx.getStorageSync('paper')
    for(var i = 0; i < postsData.length; i++){
      if(postsData[i].id == this.post_id){
        this.setData({
          detailData: postsData[i]
        })
        break;
      }
    }
    //console.log(detailData)
    // 数据绑定
    this.ellipsis();
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
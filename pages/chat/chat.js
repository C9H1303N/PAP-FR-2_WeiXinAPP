//chat.js
//获取应用实例
const app = getApp()
var url1;
var url2;

Page({
  data: {
    messages: [],         // 聊天记录
    msg: '',              // 当前输入
    scrollTop: 0,         // 页面的滚动值
    socketOpen: false,    // websocket是否打开
    lastId: '',           // 最后一条消息的ID
    isFirstSend: true,     // 是否第一次发送消息(区分历史和新加)
    receiver_id: 0,
    url1: '',       //对方头像
    url2: ''        //我的头像
  },
  onLoad(option) {
    // 设置标题
    this.setNickName(option);
    this.setData({
      receiver_id: option.id
    });
    var list;
    let id1 = option.id;
    let that = this;
    wx.request({
      url: 'https://pap2.zixfy.com/api/user/icon-by-id?id=' + id1,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      success(res){
        //console.log(res.data)
        that.setData({
          url1: res.data,
          url2: app.globalData.icon
        })
      }
    })
    wx.request({
      url: 'https://pap2.zixfy.com/api/chat-message',
      method: 'POST',
      data:{
        user_id: id1
      },
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      success(res){
        console.log(res.data)
        list = res.data.message_list;
        let new_arr = new Array();
        for(let i = 0; i < list.length; i++){
          let obj = {id:0,message:'',messageType:0};
          obj.id  = 'msg' + i;
          obj.message = list[i].message;
          if(list[i].send_id == option.id) {
            obj.messageType = 1;
          }
          else {
            obj.messageType = 0;
          }
          //console.log(obj);
          new_arr.push(obj);
        }
        that.setData({
          messages: new_arr
        })
        //console.log(new_arr)
      }
    })
    console.log(this.data.messages);
  },
  //事件处理函数
  onReady() {
    // 连接websocket服务器
    console.log(this.data.url1)
    console.log(this.data.url2)
    this.connect();
  },
  onUnload() {
    const socketOpen = this.data.socketOpen;
    if (socketOpen) {
      wx.closeSocket({});
      wx.onSocketClose(res => {
        console.log('WebSocket 已关闭！')
      });
    }
  },
  connect() {
    wx.connectSocket({
      url: 'wss://pap2.zixfy.com/chat/'
    });
    wx.onSocketOpen(res => {
      this.setData({ socketOpen: true });
    });
    console.log(this.data.socketOpen);
    wx.onSocketMessage(res => {
      console.log(res);
      console.log(this.data.messages);
      const isFirstSend = this.data.isFirstSend;
      var msggg = JSON.parse(res.data).message.msg.message;
      let messages = this.data.messages;
      let lastId = messages.length;
      var sdsd = lastId+1
     // console.log(app.globalData.icon)
      const data = {
        id: 'msg' + sdsd,
        message: msggg,
        messageType: 1
      };
      if (this.data.isFirstSend) {
        messages = messages.concat(data);
        lastId = messages[0].id;
        console.log()
        this.setData({ messages, lastId, isFirstSend: false });
        // 延迟页面向顶部滑动
        this.delayPageScroll();
      } else {
        messages.push(data);
        const length = messages.length;
        lastId = messages[length - 1].id;
        this.setData({ messages, lastId });
      }
    });
    wx.onSocketError(res => {
      console.log(res);
      console.log('WebSocket连接打开失败，请检查！')
    })
  },
  // 设置昵称
  setNickName(option) {
    const nickname = option.nickname || 'Null';
    wx.setNavigationBarTitle({
      title: nickname
    });
  },
  // 延迟页面向顶部滑动
  delayPageScroll() {
    const messages = this.data.messages;
    const length = messages.length;
    const lastId = messages[length - 1].id;
    setTimeout(() => {
      this.setData({ lastId });
    }, 300);
  },
  // 输入
  onInput(event) {
    const value = event.detail.value;
    this.setData({ msg: value });
  },
  // 聚焦
  onFocus() {
    this.setData({ scrollTop: 9999999 });
  },
  // 发送消息
  send() {
    const socketOpen = this.data.socketOpen;
    let messages = this.data.messages;
    let nums = messages.length;
    let msg = this.data.msg;

    if (msg === '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'loading',
        duration: 1000
      })
      return false;
    }
    if (socketOpen) {
      var myDate = new Date();
      var tt = JSON.stringify({
        sender_id: app.globalData.userid,
        receiver_id: this.data.receiver_id,
        msg: {
          message: msg,
          time: myDate.toLocaleString()
        },
        code: 600
      })
      console.log(tt)
      wx.sendSocketMessage({
        data: tt
      })
     // console.log(msg)
     // console.log(messages)
     // console.log(app.globalData.icon)
      const data = {
        id: nums,
        message: msg,
        messageType: 0
      };
      if (this.data.isFirstSend) {
        messages = messages.concat(data);
        var lastId = messages[0].id;
        console.log()
        this.setData({ messages, lastId, isFirstSend: false });
        // 延迟页面向顶部滑动
        this.delayPageScroll();
      } else {
        messages.push(data);
        const length = messages.length;
        var lastId = messages[length - 1].id;
        this.setData({ messages, lastId });
      }
      this.setData({ msg: '' });
    }
  }
})

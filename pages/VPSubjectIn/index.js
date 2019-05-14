// pages/VPSubjectIn/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:'',//总成绩
    chinese: '', //语文分数
    mathematics: '', //数学分数
    english: '', //英语分数
    average: '', //综合分数
    pLevel:'',//省内排名

    type:'',//判断下一步去哪一个页面
  },
  toSchoolPage(){
    if (this.data.type == 1){
      wx.navigateTo({
        url: '/pages/VPSubjectIn/school',
      })
    } else if (this.data.type == 2){
        wx.navigateTo({
          url: '/pages/professionalInto/index',
        })
    } else if (this.data.type == 3) {
        wx.navigateTo({
          url: '/pages/characterTest/index',
        })
    }
    
  },
  changeData(){
    let type = e.target.dataset.type
    let value = e.detail.value
    this.setData({
      [type]: value
    })
  },
  saveAchi(){
    app.request.achievementUpdate()
      .then(r =>{
        console.log(r)
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    this.saveAchi()
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
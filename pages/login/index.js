// pages/login/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shareShow: true,
        branchSubject: [],
        areaslist: [],
        branchSubjectindex: -1, //分科id
        provinceIndex: 0, //省份id
        provinceId: ''
    },
    provincebindPickerChange(val) {
        this.setData({
            provinceIndex: val.detail.value
        })
        this.setData({
            provinceId: this.data.areaslist[this.data.provinceIndex].id
        })
    },
    bindPickerChange(val) {
        this.setData({
            branchSubjectindex: val.detail.value
        })

    },
    loginNext(res) {
      if (this.data.branchSubjectindex < 0){
        wx.showToast({
          title:'请选择文理科',
          icon:'none'
        })
        return
      }

      let type = this.data.branchSubject[this.data.branchSubjectindex]
      let area_id = this.data.provinceId
      let { nickName, avatarUrl,  ...datas } = res.detail.userInfo
      app.request.UserInfoUpdata({ nickname: nickName, avatar: avatarUrl, type, area_id, ...datas })
            .then(r => {
              if (!wx.getStorageSync('UserInfo')) {
                wx.setStorageSync('UserInfo', r.data)
              }
                wx.setStorageSync('userPerf', {})
                let userPerf = wx.getStorageSync('userPerf')
                userPerf.provinceId = this.data.provinceId
                userPerf.branchSubjectindex = this.data.branchSubjectindex
                wx.setStorageSync('userPerf', userPerf)
                    //判断有没有 输入 分数等信息
                  wx.navigateTo({
                    url: '/pages/login/two',
                  })
            })
    },

    GETAreasList() {
        const data = wx.getStorageSync('areasList')
        if (data && data.length) {
            this.setData({
                areaslist: data,
            })
            this.setData({
                provinceId: this.data.areaslist[this.data.provinceIndex].id
            })
        } else {
            app.request.getAreasList()
                .then(r => {
                    this.setData({
                        areaslist: r.data
                    })
                    this.setData({
                        provinceId: this.data.areaslist[this.data.provinceIndex].id
                    })
                    wx.setStorageSync('areasList', r.data)
                })
                .catch(e => {
                    console.log(e)
                })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(wx.getStorageSync('userPerf'))
        if (wx.getStorageSync('userPerf')) {
            wx.switchTab({
                url: '/pages/voluntPredict/index'
            })
            return
        }
        this.GETAreasList()
        this.setData({
            branchSubject: app.branchSubject
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
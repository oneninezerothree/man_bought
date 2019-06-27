
export default {

  namespace: 'example',

  state: {
    author: 'Ryan Lau',
    inputErrorHint: false,
    errorHintText: '',
    goodsList: [
      {
        shopName: '潮男搭配师',
        selectStatus: true,
        data: [
          {
            'id': 1,
            'goodsName': '春夏季白色打底衫男韩版修身紧身健身纯棉短袖t恤男士体恤衫潮流白色 L',
            'goodsPrice': '78.00',
            'goodsNum': 3,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/45/45_05860523640282479_240.jpg',
            'status': true
          },
          {
            'id': 2,
            'goodsName': ' 男士卫衣连帽春秋款青少年学生秋装韩版潮流长袖T恤帅秋季上衣服 黑色 M',
            'goodsPrice': '89.00',
            'goodsNum': 1,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/45/45_05923383295317790_240.jpg',
            'status': true
          },
          {
            'id': 3,
            'goodsName': ' 男士卫衣连帽春秋款青少年学生秋装韩版潮流长袖T恤帅秋季上衣服 黑色 M',
            'goodsPrice': '89.00',
            'goodsNum': 1,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/45/45_05923383295317790_240.jpg',
            'status': true
          },
        ]
      },
      {
        shopName: '衣品家',
        selectStatus: true,
        data: [
          {
            'id': 1,
            'goodsName': '冬季男棉衣2018新款短款连帽棉袄韩版加厚休闲面包服男装潮牌外套 黑色 M',
            'goodsPrice': '178.00',
            'goodsNum': 1,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/34/34_05962462680786488_240.jpg',
            'status': true
          },
          {
            'id': 2,
            'goodsName': '夏季新品男式潮流T恤欧美时尚人物印花纯棉短袖体恤衫 白色 M',
            'goodsPrice': '90.00',
            'goodsNum': 2,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/34/34_05421114472823934_240.jpg',
            'status': true
          },
          {
            'id': 3,
            'goodsName': '布吉威尔秋新款男士休闲裤 青年韩版口袋中腰直筒休闲长裤 蓝色 29',
            'goodsPrice': '149.00',
            'goodsNum': 3,
            'imgUrl': 'https://www.nanshig.com/data/upload/shop/store/goods/34/34_05418950526553498_240.jpg',
            'status': true
          },
        ]
      }
    ],
    newGoodsList: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};

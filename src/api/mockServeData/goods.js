import Mock from "mockjs"

// get请求从config.url获取参数，post从config.body中获取参数
function param1Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

let List = []
const count = 400

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment()', //id排列
      'name|1': [
        'ZARA 春季新款 女装 白色短款圆领短袖T 恤',
        '优衣库 男装 优质长绒棉条纹立领衬衫(长袖斯文)',
        '优衣库 男装 优质长绒棉条纹立领衬衫(长袖斯文)',
        'Nike耐克官方AIR ZOOM PEGASUS 38男子跑步鞋',
        '好玩的弹性橡皮 美国Geddes小学生趣味足球篮球'
      ],
      'price': '￥@integer(100,2000)', //随机价格
      time: Mock.Random.date('MM-dd'),
      state: '已上架'
    })
  )
}

export default {
  /**
   * 获取
   * 要带参数 id, page, limit; id可以不填，page，limit有默认值。
   * @param id, page, limit
   * @return {{code: number, count: number, data: *[]}}
   */
  getGoodsList: config => {
    const { name, page = 1, limit = 10 } = param1Obj(config.url)
    console.log('name:' + name, 'page:' + page, '分页大小limit:' + limit);
    const mockList = List.filter(user => {
      if (name && user.name.indexOf(name) === -1) return false
      return true
    })
    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: mockList.length,
      List: pageList
    }
  },
  /**
   * 增加商品
   * @param id, name, price, time, state
   * @return {{code: number, data: {message: string}}}
   */
  createGoods: config => {
    const { id, name, price, time, state } = JSON.parse(config.body)
    console.log(JSON.parse(config.body));
    List.push({
      id: id,
      name: name,
      price: price,
      time: time,
      state: state,
    })
    return {
      code: 20000,
      data: {
        message: '添加成功'
      }
    }
  },
  /**
   * 删除商品
   * @param id
   * @return {*}
   */
  deleteGoods: config => {
    const { id } = JSON.parse(config.body)
    if (!id) {
      return {
        code: 999,
        message: '参数不正确'
      }
    } else {
      List.find(item => item.id == id).state = '已下架'
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },
  /**
   * 修改商品
   * @param id, name, price, time, state
   * @return {{code: number, data: {message: string}}}
   */
  updateGoods: config => {
    const { id, name, price, time, state } = JSON.parse(config.body)
    List.some(u => {
      if (u.id === id) {
        u.name = name
        u.price = price
        u.time = time
        u.state = state
        return true
      }
    })
    return {
      code: 20000,
      data: {
        message: '编辑成功'
      }
    }
  }
}

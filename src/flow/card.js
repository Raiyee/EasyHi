export type CARD = {
  cardTypeId: string, // 卡类型 ID
  cardTypeName: void | string, // 卡类型名称
  cardName: void | string, // 卡名称
  cardId: void | string, // 卡 ID
  cardTimes: void | number, // 卡面总次数/金额, 小于 0 时为无限次
  cardLimit: void | boolean | string, // 卡消费上限，('', '无限次', '*次/月', '*次/周'), 非年卡为空
  cardPrice: void | number, // 卡价格
  cardDiscount: void | number, // 卡折扣, 1-10
  isValueCard: boolean, // 是否是储值卡
  cardExpired: void | string, // 卡有效期时间, *天, *个月, *年, 卡实例为时间段
  cardStyle: number // 卡样式, int(-1, 5)(-1表示不可用卡)
}

export type MBR_CARD = CARD & {
  mbrCardId: string, // 会员卡 ID
  cardNo: string, // 会员卡卡号
  availTimes: number, // 剩余可用次数
  forbidden: void | boolean, // 是否被禁用
  transferred: void | boolean, // 是否已转出
  expired: void | boolean, // 是否已过期
  state: void | boolean, // 是否激活,
  cardExpiredRange: void | Array<string> // 卡实例有效期时间段信息
}

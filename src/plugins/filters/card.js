export const cardState = (card) => {
  /** @namespace card.isApply */
  /** @namespace card.hasSurplus */
  /** @namespace card.isApplyPeriod */
  return !card.isApplyPeriod ? '本时段不适用'
    : !card.isApply ? '本课不适用'
      : !card.hasSurplus ? '余额不足' : ''
}

export const voucherState = (voucher) => {
  return !voucher.isApply ? '本课不适用'
    : !voucher.hasSurplus ? '已用完' : ''
}

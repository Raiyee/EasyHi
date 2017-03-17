export type VOUCHER_BASE = {
  voucherId: void | string,
  voucherName: string,
  voucherValue: number,
  voucherTimes: void | number,
  voucherDescription: void | string,
  voucherExpiredRange: void | Array<string>,
  applicableCourses: void | Array<string>
}

export type VOUCHER = VOUCHER_BASE & {
  voucherExpiredType: void | boolean,
  voucherExpiredLimit: void | boolean | number,
  miniConsume: void | number,
  presentedNum: void | number
}

export type VOUCHER_INST = VOUCHER_BASE & {
  voucherInstId: string,
  usedTime: void | string,
  availableTimes: void | number
}

type REWARD = {
  rewardThreshold: number,
  rewardContent: string
}

export type INVITATION_REWARD = {
  inviterReward: void | Array<REWARD>,
  inviteeRewardId: string,
  inviteeRewardContent: string,
  inviteeRewardExpiredType: boolean,
  inviteeRewardExpiredLimit: number,
  inviteeRewardExpiredRange: Array<string>
}

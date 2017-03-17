import {REVIEW} from './review'

export type COACH_REST_TIME = {
  restId: string,
  restRange: Array<string>,
}

export type COACH = {
  coachId: void | string,
  coachName: string,
  userId: string,
  coachMobile: string,
  coachGender: boolean,
  mobileVisible: boolean,
  coachRate: void | number,
  coachPrize: void | string,
  teachingExp: void | string,
  coachProfile: void | string,
  coachPortrait: void | string,
  coachSpeciality: void | string,
  restTimes: void | Array<COACH_REST_TIME>,
  coachReviews: void | Array<REVIEW>
}

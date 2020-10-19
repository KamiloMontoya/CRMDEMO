import { IHttpResponse } from 'app_utils/types/httpTypes'

// export interface IAlliance {
//   _id: string,
//   name: string,
//   description: string,
//   slug: string,
//   modules: [],
//   styles: [],
//   deleted: boolean,
//   created_at: Date,
//   updated_at: Date,
// }

export interface IAllianceListItem {
  _id: string
  name: string
  description: string
  details?: any
}

// export interface IAllianceHttpResponse extends IHttpResponse {
//   alliance: IAllianceListItem
// }

export interface IAlliancesHttpResponse extends IHttpResponse {
  alliances: IAllianceListItem[]
  total_register: number
  pageNumber: number
  nPerPage: number
}

// export interface IAllianceHttpCreateResponse extends IHttpResponse {
//   alliance: IAlliance,
//   total_register?:any,
//   nPerPage?:any,
//   pageNumber?:any,
// }

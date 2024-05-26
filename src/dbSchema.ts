export interface Data {
  id: number,
  hardwareid: string,
  pspec: string,
  type: string,
  generic: string,
  package: string,
  leadcount: number,
  description: string,
  status: string,
  comments: string,
  owner: string,
  dateModified: string,
  qtyRequest: number,
  supplier: string,
  supplierPartNumber: string,
  requestor: string,
  typeacronym: string,
  barcode: string,
  serialnumber: string,
  withtag: string,
  focusteam: string,
  tags?: string
  inUseDuration: number | string
};

export interface User {
  id: number,
  employeeid: string,
  lastname: string,
  givenname: string,
  email: string,
  team: string,
  nickname: string,
  username: string,
  password: string,
  isAdmin: boolean,
  isSuperAdmin: boolean,
  dateCreated: string,
  fullname: string
}

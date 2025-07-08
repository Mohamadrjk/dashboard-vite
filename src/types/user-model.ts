export interface IUser {
  token: string;
  user: IAdminProfileInfo;
}

export interface IAdminProfileInfo {
  username: string;
  //   email: string;
  //   cellPhone: string;
  //   firstName: string;
  //   lastName: string;
  //   isActive: boolean;
  //   roleId: number;
  //   id: number;
  //   createDate: Date;
}
export interface IUserDropdown {
  id: number;
  fullName: string;
}

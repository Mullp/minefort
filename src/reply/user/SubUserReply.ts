import {SubUserRole} from '../../typings';

export type SubUserReply = {
  userId: string;
  email?: string;
  role: SubUserRole;
  accepted: boolean;
};

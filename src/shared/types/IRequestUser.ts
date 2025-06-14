import { Request } from "express";

interface IDecode {
  id: string;
  token: string;
}

export interface IRequestUser extends Request {
  user?: IDecode | any;
}

import { Request, Response } from 'express'

const authMiddleware = (req: Request, res: Response, next: Function): void => {
  console.log("Authorization middleware.");
  next();
};

module.exports = authMiddleware;

import { Request, Response, NextFunction} from "express";

export function InvalidPathHandler(req: Request, res: Response, next: NextFunction): void {
    res.status(404).send('Not Found')
}

import type { Request, Response, NextFunction} from "express";

export function ControllersErrorHandler(error: { status: number; message: string; }, req: Request, res: Response, next: NextFunction):void {
    const errorStatusCode = error.status || 400;
    res.header("Content-Type", 'application/json');
    res.status(errorStatusCode).send(error.message);
}

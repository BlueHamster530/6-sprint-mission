import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';
export declare const EXPRESS: typeof express;
export declare const PORT: string | number;
export declare const prismaClient: PrismaClient<import(".prisma/client").Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export type ExpressRequest = Request;
export type ExpressResponse = Response;
export type ExpressNextFunction = NextFunction;
//# sourceMappingURL=constants.d.ts.map
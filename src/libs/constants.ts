import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';

dotenv.config();

export const EXPRESS = express;
export const PORT = process.env.PORT || 3000;
export const prismaClient = new PrismaClient;


export type ExpressRequest = Request;
export type ExpressResponse = Response;
export type ExpressNextFunction = NextFunction;
import prisma from "../db/prismaClient.ts";

export const create = async (original: string, shortened: string) =>
  prisma.url.create({
    data: {
      original,
      shortened,
    },
  });

export const findByUrl = async (original: string) =>
  prisma.url.findUnique({
    where: {
      original,
    },
  });

export const findByShortUrl = async (shortened: string) =>
  prisma.url.findUnique({
    where: {
      shortened,
    },
  });

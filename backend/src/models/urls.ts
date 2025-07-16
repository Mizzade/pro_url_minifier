import prisma from "../db/prismaClient";

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

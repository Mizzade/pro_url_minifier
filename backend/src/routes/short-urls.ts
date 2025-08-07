import type { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import validUrl from "valid-url";
import * as Url from "../models/urls.ts";
import ApiError from "../errors/api-error.ts";

const nanoidAsync = async (length: number): Promise<string> =>
  Promise.resolve(nanoid(length));

export const createShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { url }: { url: string } = req.body || {};

  if (!url) {
    const error = new ApiError("Missing URL in request body.", 400);
    return next(error);
  }

  const trimmedUrl = url.trim();

  if (!validUrl.isUri(trimmedUrl)) {
    const error = new ApiError("Invalid URL.", 400);
    return next(error);
  }

  try {
    const urlModel = await Url.findByUrl(trimmedUrl);
    if (urlModel) {
      res.json({ url: trimmedUrl, shortUrl: urlModel.shortened });
      return; // necessary since Express expects a return of void or Promise<void>
    }

    const shortUrl = await nanoidAsync(10);
    await Url.create(trimmedUrl, shortUrl);
    res.json({ url: trimmedUrl, shortUrl });
  } catch (error) {
    next(error);
  }
};

export const getOriginalUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { shortUrl } = req.params;

  if (!shortUrl) {
    const error = new ApiError("Missing short URL parameter.", 400);
    return next(error);
  }

  try {
    const urlModel = await Url.findByShortUrl(shortUrl);

    if (!urlModel) {
      const error = new ApiError("Invalid short URL.", 404);
      return next(error);
    }

    const { original, shortened } = urlModel;
    res.json({ original, shortened });
  } catch (error) {
    next(error);
  }
};

import path from 'path';
import fs from 'fs';

export const createImageFileName = (originalFileName: string) => {
  const today = new Date();
  const filename = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}-${today.getMilliseconds()}${path.extname(
    originalFileName
  )}`;

  return filename;
};

export const createImageURL = (files: Express.Multer.File[]): string[] => {
  const url = files.map((file) => `${file.destination.replace('public', '')}/${file.filename}`);

  return url;
};

export const deleteImages = (url: string | string[]) => {
  const deleteStatus: Array<string | NodeJS.ErrnoException> = [];

  if (typeof url === 'string') {
    const imagePath = `public/${url}`;

    fs.unlink(imagePath, (err) => {
      if (err) console.error(err);
    });
  } else if (Array.isArray(url)) {
    url.forEach((image) => {
      const imagePath = `public/${image}`;

      fs.unlink(imagePath, (err) => {
        if (err) console.error(err);
      });
    });
  }

  return deleteStatus;
};

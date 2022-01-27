import { Router } from 'express';
import multer from 'multer';
import { addCityImages, deleteCityImages, editCity, getCity } from '../controller/city';
import { verifyUser } from '../controller/user';
import { createImageFileName } from '../helpers/images';

const cityRouter = Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const folder = 'public/images/original';

    callback(null, folder);
  },
  filename: (request, file, callback) => {
    const filename = createImageFileName(file.originalname);

    callback(null, filename);
  },
});

const upload = multer({ dest: 'public', storage });

cityRouter.get('/', verifyUser(), getCity);

cityRouter.put('/', verifyUser(/* 'admin' */), editCity);

cityRouter.post('/images', verifyUser(/* 'admin' */), upload.fields([{ name: 'images' }]), addCityImages);

cityRouter.delete('/images', verifyUser(/* 'admin' */), deleteCityImages);

export default cityRouter;

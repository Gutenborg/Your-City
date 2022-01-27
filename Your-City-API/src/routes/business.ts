import { Router } from 'express';
import multer from 'multer';
import {
  addBusinessImages,
  createBusiness,
  deleteBusiness,
  deleteBusinessImages,
  editBusiness,
  getBusinessById,
  getBusinesses,
} from '../controller/business';
import { verifyUser } from '../controller/user';
import { createImageFileName } from '../helpers/images';

const businessRouter = Router();

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    let folder = 'public/logos/original';

    if (file.fieldname === 'images') {
      folder = 'public/images/original';
    }

    callback(null, folder);
  },
  filename: (request, file, callback) => {
    const filename = createImageFileName(file.originalname);

    callback(null, filename);
  },
});

const upload = multer({ dest: 'public', storage });

// This is middleware for the default router.
businessRouter.use((request, response, next) => {
  // console.log('Request Method: ', request.method);
  // console.log('Request Time: ', Date.now());
  next();
});

businessRouter.get('/', verifyUser(), getBusinesses);

businessRouter.get('/:id', verifyUser(), getBusinessById);

businessRouter.post(
  '/',
  verifyUser(/* 'admin' */),
  upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'images' }]),
  createBusiness
);

businessRouter.put('/:id', verifyUser(/* 'admin' */), upload.fields([{ name: 'logo', maxCount: 1 }]), editBusiness);

businessRouter.post(
  '/images/:id',
  verifyUser(/* 'admin' */),
  upload.fields([{ name: 'images', maxCount: 1 }]),
  addBusinessImages
);

businessRouter.delete('/images/:id', verifyUser(/* 'admin' */), deleteBusinessImages);

businessRouter.delete('/:id', verifyUser('admin'), deleteBusiness);

export default businessRouter;

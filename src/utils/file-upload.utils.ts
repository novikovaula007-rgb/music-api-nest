import {diskStorage} from "multer";
import {join, extname} from "path";
import {randomUUID} from 'crypto';
import process from "node:process";
import fs from "node:fs";

export const musicStorage = diskStorage({
    destination: (req, file, cb) => {
        let folder = 'others';
        const url = req.originalUrl;

        if (url.includes('artist')) {
            folder = 'artists';
        } else if (url.includes('album')) {
            folder = 'albums';
        } else if (url.includes('track')) {
            folder = 'track';
        }

        const destDir = join(process.cwd(), 'public', 'uploads', folder);
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, {recursive: true});
        }

        cb(null, destDir);
    },

    filename: (req, file, cb) => {
        const extension = extname(file.originalname);
        cb(null, `${randomUUID()}${extension}`);
    }
});
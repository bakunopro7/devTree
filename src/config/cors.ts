import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whiteList = []
        whiteList.push(process.env.FRONTEND_URL);
        if(process.argv[2]=== '--api'){
            whiteList.push(undefined);
        }
        if(whiteList.indexOf(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
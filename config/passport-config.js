// import { ExtractJwt, Strategy, } from 'passport-jwt';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import database from '../prisma.js';
import { validateToken } from '../controllers/user-controller.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

export default async passport => {
    // console.log(process.env.JWT_SECRET);
   await passport.use(
       new JWTStrategy(opts, async (jwt_payload, done) => {
      const user = await database.users.findFirst({
        where:{
            email:jwt_payload.email
        }
      })
      const token = await database.tokens.findFirst({
        where:{
          id:+jwt_payload.user.tokenId
        }
      })
      if (token) {
        return done(null, {tokenId:jwt_payload.user.tokenId,userId:jwt_payload.user.userId});
      }
      console.log("error");
      return done(null, false);
    })
  );
};
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local"
import database from "../prisma.js";
import bcrypt from "bcrypt"

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};
const verifyCallback = async (email, password, done) => {
    try {
        const user = await database.users.findUnique({
            where:{
                email:email,
            }
        });
        if(!user){
            return done(null, false) 
        }
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return done(null, false)
        }
        return done(null, user);
        
    } catch (error) {
        done(error);
    }
}
export default function(){passport.use(new LocalStrategy(customFields,verifyCallback))}



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});
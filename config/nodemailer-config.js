import nodemiler from "nodemailer";


export const mailTransporter  = nodemiler.createTransport({
    service:"outlook",
    auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_EMAIL_PASSWORD,
      },
      tls:{
        rejectUnauthorized: false
      }
})
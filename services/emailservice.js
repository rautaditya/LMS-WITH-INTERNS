//email sedn login file code
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "adityaraut4289@gmail.com",
        pass: "yuvr rzcr ndil ypne",
    },
});
export default transporter;
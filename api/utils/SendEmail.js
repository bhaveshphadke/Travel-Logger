const nodemailer = require('nodemailer')

exports.sendMail = async(options)=>{
    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bhaveshphadke30@gmail.com',
            pass: process.env.EMAIL_SECRETE
        }

    })
    const mailOptions = {
        from: 'bhaveshphadke30@gmail.com',
        to: options.email,
        subject: options.subject,
       text: options.message
    }
    
    await transporter.sendMail(mailOptions)
}
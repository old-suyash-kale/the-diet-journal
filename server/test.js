let nodemailer = require('nodemailer');

nodemailer.createTransport({
    host: 'the-diet-journal.suyashkale.in',
    port: 587,
    secure: false,
    auth: {
        user: 'no-reply@the-diet-journal.suyashkale.in',
        pass: 'no-reply1!'
    },
    tls: {
        rejectUnauthorized: false
    }
})
.sendMail({
    from: `'The Diet Journal' <no-reply@the-diet-journal.suyashkale.in>`,
    to: `Suyash <master.suyashkale@gmail.com>`,
    subject: 'Email Verification - The Diet Journal',
    text: `Code: 365836`,
    html: `Code: 365836`
},(err, suc)=> {
    if (err) {
        reject();
    } else {
        resolve();
    }
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (email,name)=>{

  const msg = {
    to: email,
    from: 'nik.shivamprajapati@gmail.com',
    subject: 'Welcome',
    text: `Thank you ${name}!, for using TaskManager API`
  };
  sgMail.send(msg);

}

const sendExitMail = (email, name)=>{
  const msg = {
    to: email,
    from: 'nik.shivamprajapati@gmail.com',
    subject: 'Bye!',
    text: `Good bye ${name}`
  };
  sgMail.send(msg);
}

module.exports = {sendMail,sendExitMail};

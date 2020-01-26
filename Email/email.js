const key = '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'

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(key);

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

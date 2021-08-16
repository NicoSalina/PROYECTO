const nodemailer = require('nodemailer');
// envio de email tiene asociada una demora entonces es async await

const send = async({mail, asunto = 'Gracias por registrarte !!!', cuerpo}) => {   
    try{
    const transporter = nodemailer.createTransport({   
        /*host: 'smtp.gmail.com',
        port: 587,
        secure: false*/      // si mi pagina tiene certificados SCL (certificados de seguridad)
        //service: 'gmail',   // es lo mismo que lo comentado /* */
        service: process.env.MAIL_SERVICE || 'gmail',      //|| 'outlook',
        auth : {
            user: process.env.MAIL_USER || 'mail', //'testernodeemail@gmail.com',    //|| 
            pass: process.env.MAIL_PASSWORD || 'password',  //|| 'sistem64'
        }
    }); 
    const info = {
        from: '<no-reply>testernodeemail@gmail.com<no-reply>',
        to: mail,          // 'nicolas.salina@hotmail.com'
        subject: asunto,  // 'Bienvenido a mi pagina 😃'
        html: cuerpo     // '<h2> Gracias por registrate </h2>'
        //text: '<h2> Bienvenido a mi email perro viejo </h2>'  
    };
    const {messageId} = await transporter.sendMail(info); 
    return messageId;
    }
    catch(e){
        console.log(e);
    }  
}

module.exports = {send};    // exportamos la funcion asi la podemos usar en el resto de la aplicacion web



//<i class="fas fa-edit"></i>  edit


//<i class="fas fa-trash-alt"></i>  delete


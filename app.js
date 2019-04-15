var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    nodemailer      = require("nodemailer");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/aviso", function(req, res){
    res.render("aviso");
});

app.post("/contacto", function(req, res) {
    let contacto = req.body.contacto;
    const output = `
        <p>Tienes una nueva solicitud!!!!</p>
        <h3> Detalles de la solicitud de: ${contacto.razonSocial} </h3> 
        <ul>
            <li>Nombre: ${contacto.nombre}</li>
            <li>Teléfono: ${contacto.telefono}</li>
            <li>Correo electrónico: ${contacto.email}</li>
            <li>Descripción o Comentario: ${contacto.desCom}</li>
        </ul> 
    `;

    let transporter = nodemailer.createTransport({
        host: 'kepler-oilgas.com.mx',
        port: 587,
        secure: false,
        tls:{
            rejectUnauthorized: false
        },
        auth: {
            user: 'contacto@kepler-oilgas.com.mx',
            pass: '?ra91f9V'
        }
    })

    let mailOptions = {
        from: '"KEPLER CONTACTO" <contacto@kepler-oilgas.com.mx>',
        to: 'contacto@kepler-oilgas.com.mx',
        subject: 'NUEVA SOLICITUD!!!!',
        text: 'Prueba',
        html: output
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return console.log(error);
        }
    })

    res.render('ok');
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Esta vivo!!!!")
})
//process.env.PORT
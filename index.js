const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const socketIO = require('socket.io');


app.use('/', express.static(path.join(__dirname, 'public')))


const linkSchema = new mongoose.Schema({
    identificador: {type:Number, default:123321} ,
    title: String,
    timestamp: {type:Number, default:0}
})


const server = app.listen(3030, ()=>{
    console.log("Running")
})


//* entregar uma porta
const DBname = "cadTime";
const DB_SERVER = "localhost";


mongoose
    .connect(`mongodb://${DB_SERVER}/${DBname}`)
    .then(() => {console.log('Conectamos ao MongoDB!');app.listen(3000)})
    .catch((err) => console.log(err))


// Servidor transações
const io = socketIO(server);
io.on('connection', (socket) => { // abre a escuta de eventos 

        //* enviar mnsg para o front ADM
        socket.emit('hello', {msg:"tudo certo!"});

        //* enviar mnsg para o front USER
        socket.emit('connect_user', {msg:"Enviar pro user"})
     
        //? Espera receber uma mnsg que vem do front ADM
        socket.on('enviar', (data)=>{
            console.log(data.msg);
        })

        //? Espera receber uma mnsg que vem do front USER
        socket.on('obgdoBack', (data)=>{
            console.log(data.msg);
        })

        //? Espera receber uma mnsg que vem do front ADM
        socket.on('enviaTSdoUser',(Ts)=>{
            console.log(Ts)
            io.emit('Tm',(Ts))
        })


        //? Espera receber uma mnsg que vem do front ADM
        socket.on('timeEspera',(time)=>{
            console.log("time: chegou no back "+time)
            console.log(time.calculoTempoDeEspera)
            console.log(time.texto)

            //? É PRECISO POR UMA CONDICIONAL IF AQUI

            // // CREACAO 
            // const links = mongoose.model('Link', linkSchema);
            // const link = new links({ title: 'string',  });
            // link.save(function (err) {
            // if (err) return handleError(err);
            // // saved!
            // });



            async function updatemongo(texto, calcTempo) {
                const links = mongoose.model('Link', linkSchema);
                // await links.create({ linkSchema });
                const filter = { identificador:123321 };
                const update = { title: texto,timestamp: calcTempo};
                // `doc` is the document _before_ `update` was applied
                let doc = await links.findOneAndUpdate(filter, update);
                console.log("doc",doc)
                doc = await links.findOne(filter);
                doc.title; // 'Jean-Luc Picard'
                doc.timestamp; // undefined
                // io.emit('objetoParaFront',(time))
            }
            updatemongo(time.texto, time.calculoTempoDeEspera)
        

        })

        //? Espera uma mnsg do front que a pagina carregou
        socket.on('enviaTempoPF',(Ts)=>{
            console.log(Ts)

            const Link = mongoose.model('Link', linkSchema)

            Link.find({identificador:123321}).then(doc=>{
                var title= doc[0].title
                var time= doc[0].timestamp
                console.log("title: "+title)
                console.log("time: "+time)
                
            io.emit('recebeTempo',{title,time})
            })
            
            // io.emit('recebeTempo',{title,time})
        })

})//fecha escuta de eventos



//? teste 2

async function funcinterval() {

        const links = await mongoose.model('Link', linkSchema)

        let document = await links.findOneAndUpdate({ identificador:123321 })

        // console.log(document.timestamp)

        if(document.timestamp > 0) {

            var time = document.timestamp
            time -= 1000;
            // console.log("time"+time)

            const filter = { identificador:123321 };
            const update = { timestamp: time };

            let documento = await links.findOneAndUpdate(filter, update)

                // console.log("doc", documento)
                console.log(document.timestamp)

                documento = await links.findOne({ identificador:123321 });
                documento.title;
                documento.timestamp;

                

        }else{
            console.log("time é menor que 0(Zero)")
        }

    }

setInterval(funcinterval, 1000)


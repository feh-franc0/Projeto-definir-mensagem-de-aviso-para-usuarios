// esta linkado ao html
const socket = io('http://localhost:3030')


document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    socket.emit('enviaTempoPF',{msg:"me envia o tempo que tem no banco pf"})


    console.log(socket)

});


socket.on('connect_user', (messages) => 
{//1-update_messages escuta
    console.log(messages.msg)
    socket.emit('obgdoBack',{msg:"obgdo por receber o user"})
    socket.on('recebeUser',(data)=>{console.log(data.msg)})
})
function hide(){
    document.getElementById("erro").style.display = "none";
}


socket.on('recebeTempo',(Ts)=>{
    console.log("ESSE DADO ESTA NO FRONT AGORA",Ts)    
    console.log("title",Ts.title)
    console.log("time",Ts.time)

    
    const aviso = document.querySelector("#telaAviso");
    
    function Hm(){
        console.log("Executando a funnção que chama o timestamp")
        
        var texto=`<h1>${Ts.title}</h1>`
        // const aviso = document.querySelector("#telaAviso");
        
        aviso.innerHTML = `
        <div id="erro" class="alert alert-danger" role="alert">
            <button type="button" class="btn btn-danger close" onclick="hide()">&times;</button>
            <spam>${texto}</spam>
        </div>
        `
        
        // document.querySelector("#telaAviso").style.display="block"

        if(Ts.time <= 0){
            document.querySelector("#telaAviso").style.display="none"
        } else {    
            document.querySelector("#telaAviso").style.display="block"
        }
    }
    Hm()
})



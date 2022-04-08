document.addEventListener("DOMContentLoaded", function (){

    const btnEnviar1 = document.querySelector("#appt2")

    let data = new Date();
    let dia = ("0" + data.getDate()).slice(-2);
    let mes = ("0" + (data.getMonth() + 1)).slice(-2);
    let ano4 = data.getFullYear();
    let str_data = ano4 + '-' + mes + '-' + dia;

    console.log(" TESTANDO : " + str_data);

    btnEnviar1.value = str_data;


});

const socket = io('http://localhost:3030')

//? Recebe a mnsg do servidor
socket.on('hello', (messages) => {

    console.log(messages.msg)
    socket.emit('enviar',{msg:"enviado pro back"})

})

function cancel(){
    document.getElementById("erro").style.display = "none";
}


//TODO:  Defina TIME de ate 24h 
//* id do input submit
const btn1 = document.querySelector("#send1");

btn1.addEventListener("click", function(e){

    e.preventDefault();

    // id do campo de escrita
    const btnEnviar = document.querySelector("#appt1");

    const value = btnEnviar.value;

    console.log(value);

    const array = value.split(":")

    console.log(array)
    console.log(array[0])
    console.log(array[1])

    var timeHora = array[0]*(60*(60*1000))
    var timeMin = array[1]*(60*1000)

    console.log(timeHora)
    console.log(timeMin)

    var totalHm = timeHora + timeMin

    Hm()

    function Hm(){
        document.getElementById("erro").style.display = "block";
        setTimeout(function() {
            document.getElementById("erro").style.display = "none";
        }, totalHm);
        
        console.log(totalHm)
        enviaUser()
        function enviaUser(){
            socket.emit('enviaTSdoUser', {totalHm})
        }
    }
    
});



//TODO:  Defina TIME de ate 24h 
//* id do input submit
const btn2 = document.querySelector('#send2');

btn2.addEventListener("click", function(e){

    e.preventDefault();

    // id do campo de escrita
    const btnEnviar1 = document.querySelector("#appt2")
    const btnEnviar2 = document.querySelector("#appt3")
    const textoAviso = document.querySelector("#texto-aviso")

    var value1 = btnEnviar1.value;
    var value2 = btnEnviar2.value;
    var texto = textoAviso.value;
    console.log("texto do aviso: ",texto)

    console.log(value1, value2)
    
    if(value2 == 0 || value2 == ''){
        const btnEnviar2 = document.querySelector("#appt3")
        var value2 = btnEnviar2.value;
        console.log("Não foi definido o tempo final!")
        
        let data = new Date();
        let dia = ("0" + data.getDate()).slice(-2);
        let mes = ("0" + (data.getMonth() + 1)).slice(-2);
        let ano4 = data.getFullYear();
        let str_data = ano4 + '-' + mes + '-' + dia;

        value2 = str_data

    }

    const arrayValue1 = value1.split('-')
    const arrayValue2 = value2.split('-')

    console.log("split:  ",arrayValue1, arrayValue2)

    var arrayValue1Ano = arrayValue1[0]
    var arrayValue1Mes = arrayValue1[1]
    var arrayValue1Dia = arrayValue1[2]

    
    var arrayValue2Ano = arrayValue2[0]
    var arrayValue2Mes = arrayValue2[1]
    var arrayValue2Dia = arrayValue2[2]

    var arrayDados1 = [arrayValue1Ano,arrayValue1Mes,arrayValue1Dia]
    var arrayDados2 = [arrayValue2Ano,arrayValue2Mes,arrayValue2Dia]

    console.log("array1: " + arrayDados1 +  "|  array2: " + arrayDados2)



    var datas = new Object();
    datas.dataInicio = arrayDados1;
    datas.dataFim = arrayDados2;
    console.log("datas OBJ: ",datas)



    var objAno1 = datas.dataInicio[0]
    var objMes1 = datas.dataInicio[1]
    var objDia1 = datas.dataInicio[2]
    console.log("Demonstração:1 ",objAno1,objMes1,objDia1)
    // a partir de uma data, obter o timestamp
    // também pode usar a string diretamente
    dataTimeInicio = new Date(objAno1+"-"+objMes1+"-"+objDia1);
    var timeInicio = dataTimeInicio.getTime();
    console.log("Timestamp dataTimes1:  "+parseInt(timeInicio))
    console.log(timeInicio)
    // converter o timestamp para uma data
    let date1 = new Date(timeInicio);
    console.log("Time Inicio date1: ",date1);



    var objAno2 = datas.dataFim[0]
    var objMes2 = datas.dataFim[1]
    var objDia2 = datas.dataFim[2]
    console.log("Demonstração:2 ",objAno2,objMes2,objDia2)
    // a partir de uma data, obter o timestamp
    // também pode usar a string diretamente
    dataTimeFim = new Date(objAno2+"-"+objMes2+"-"+objDia2);
    var timeFim = dataTimeFim.getTime();
    console.log("Time Fim dataTimes2:  "+parseInt(timeFim))
    console.log(timeFim)
    // converter o timestamp para uma data
    let date2 = new Date(timeFim);
    console.log("Timestamp date2: ",date2);




    // Tempo entre o Inicio e o FIM
    var calculoTempoDeEspera = timeFim-timeInicio;
    // var calculoTempoDeEspera = 10000; //!TESTE DE 10 SEGUNDOS DE TEMPOROZIDOR
    console.log("calculo: "+calculoTempoDeEspera)
    console.log("texto de aviso"+texto)


    
    socket.emit('timeEspera',{calculoTempoDeEspera,texto})




})
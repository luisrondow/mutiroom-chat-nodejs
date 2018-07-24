//importar as config do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
    console.log('Servidor On');
})

var io = require('socket.io').listen(server);

app.set('io', io);

//criar conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário Conectou');

    socket.on('disconnect', function(){
        console.log('Usuario desconectou');
    });

    //conversa com o servidor
    socket.on('msg', function(data){
        //dialogos
        socket.emit('msg', {apelido: data.apelido, mensagem: data.mensagem});

        socket.broadcast.emit('msg', {apelido: data.apelido, mensagem: data.mensagem});

        //participantes
        if(parseInt(data.apelidoAtt) == 0){
            socket.emit('participantes', {apelido: data.apelido});

            socket.broadcast.emit('participantes', {apelido: data.apelido});
        }
        
    });
});
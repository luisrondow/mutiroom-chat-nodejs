module.exports.iniciaChat = function(app, req, res){

    var dadosForm = req.body;

    req.assert('apelido','Nome ou apelido obrigatório').notEmpty();
    req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres').len(3,15);

    var erros = req.validationErrors();

    if(erros) {
        res.render('index', {validacao : erros});
    }

    app.get('io').emit(
        'msg',
        {apelido: dadosForm.apelido, mensagem: ' entrou no chat'}
    );
    
    res.render('chat', {dadosForm: dadosForm});
}
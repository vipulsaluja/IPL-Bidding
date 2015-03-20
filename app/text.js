var express = require('express'),
    app     = express(),
    mysql   = require('mysql'),
    connectionpool = mysql.createPool({
        host     : 'localhost',
        user     : 'sa',
        password : 'Passw0rd',
        database : 'IPL'
    });
app.get('/:table', function(req,res){
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM '+req.params.table+' ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                }
                res.send({
                    result: 'success',
                    err:    '',
                    fields: fields,
                    json:   rows,
                    length: rows.length
                });
                connection.release();
            });
        }
    });
});
app.get('/:table/:id', function(req,res){});
app.post('/:table', function(req,res){});
app.put('/:table/:id', function(req,res){});
app.delete('/:table/:id', function(req,res){});
app.listen(3000);
console.log('Rest Demo Listening on port 3000');
/**
 * Created by enixdark on 12/8/14.
 */
var mongo = require('../db')


function handle_filed_projection(err,db,query,field){
    if(err) throw err;
    db.collection('grades').find(query,field).toArray(function (err,doc) {
        doc.forEach(function(item){

            console.dir(item);
            db.close();
        });
    });

}

mongo.mongoclient.open(function(err,client){
    query = {};
    field = {'student':1,'_id':0};
    db = client.db('course');
    handle_filed_projection(err,db,query,field);

});
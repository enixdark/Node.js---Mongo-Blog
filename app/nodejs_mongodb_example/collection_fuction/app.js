var mongo = require('../db');

function handle_regex(err,db,query){
    if(err) throw err;
    var cursor = db.collection('grades').find(query);
    return cursor;
    //cursor.each(function(err,doc){
    //    if(err) throw err;
    //    return doc;
    //});
}

function handle_skip_limit(err,db,query,num_skip,num_limit){
    if(err) throw err;
    var cursor = handle_regex(err,db,query);
    if(num_skip && typeof num_skip == 'number'){
        cursor = cursor.skip(num_skip);
    }
    if(num_limit && typeof num_limit == 'number' ){
        cursor = cursor.limit(num_limit);
    }
    cursor.each(function(err,doc){
        if(err) throw err;
        console.dir(doc);
        db.close()
    });
}


function handle_insert(err,db,obj){
    if(err) throw err;

    var data = db.collection('grades');
    data.insert(obj,function(err,doc){
        if (err) throw err;
        console.log("inserted obj " + JSON.stringify(doc));
        db.close();
    })

}

function handle_findAndModify(err,db,query,sort,operator,options){
    if(err) throw err;
    var cursor = db.collection('counters');
    cursor.findAndModify(query,sort,operator,options,function(err,doc){
        if(err) throw err;
        if(!doc){
            console.log("No counter found for comments.")
        }
        else{
            console.log("Number comment is : " + doc.counter);
        }
        db.close();
    });
}

//function handle_update(err,db,obj,upsert,multiupdate){
//    if(err) throw err;
//
//    var newobj = obj
//}

mongo.mongoclient.open(function(err,client){
    db = client.db('course');
    //query = {"student":{'$regex':'^S'}};
    //doc = {"name":"CQ","age":18};
    //handle_regex(err,db,query);
    //handle_skip_limit(err,db,query,1,2);
    //handle_insert(err,db,doc);
    var query = {name:'comments'};
    var sort = [];
    var operator = {'$inc':{'counter':1}};
    var options = {'new' : true};

    handle_findAndModify(err,db,query,sort,operator,options);

    null;
});
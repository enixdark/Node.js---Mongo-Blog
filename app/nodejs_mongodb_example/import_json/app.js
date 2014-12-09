/**
 * Created by enixdark on 12/8/14.
 */

var mongo = require('../db');
var request = require('request');
function import_json(err,db,files){
    if(err) throw err;
    console.log(files);
    request(files,function(error,res,body){
        if(!error && res.statusCode == 200){
            var obj = JSON.parse(body);
            var stories = obj.data.children.map(function(story){
               return story.data;
            });

            //console.log(stories);
            db.collection('reddit').insert(stories,function(err,data){
                if(err) throw err;
                console.dir(data);
                db.close();
            });
        }


    });
}

mongo.mongoclient.open(function(err,client){
    db = client.db('course');
    import_json(err,db,"http://reddit.com/.json");
});


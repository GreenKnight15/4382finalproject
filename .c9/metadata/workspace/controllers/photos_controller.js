{"filter":false,"title":"photos_controller.js","tooltip":"/controllers/photos_controller.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":24,"column":0},"action":"insert","lines":["var mongoose = require(\"mongoose\"),","    Photo= mongoose.model('Photo');","","exports.getPhoto = function(req,res){","    Photo.findOne({_id:req.query.photoId})","    .exec(function(err,photo){","        if(!photo){","            res.json(404,{msg:'Photo not Found'});","        } else {","            res.json(photo);","        }","    });","};","","exports.getPhotos = function(req,res){","    Photo.find()","    .exec(function(err,photos){","         if(!photos){","            res.json(404,{msg:'Photos not Found'});","        } else {","            res.json(photos);","        }","    });","};",""]}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":21,"column":9},"end":{"row":21,"column":9},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":78,"mode":"ace/mode/javascript"}},"timestamp":1417463737013,"hash":"91621a47321dcbfea15587d59f0ca95bb9a07922"}
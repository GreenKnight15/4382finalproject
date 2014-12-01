{"filter":false,"title":"comments_controller.js","tooltip":"/controllers/comments_controller.js","undoManager":{"mark":42,"position":42,"stack":[[{"group":"doc","deltas":[{"start":{"row":0,"column":0},"end":{"row":67,"column":0},"action":"insert","lines":["var mongoose = require(\"mongoose\"),","    CommentThread = mongoose.model('CommentThread'),","    Reply = mongoose.model('Reply');","","exports.getComment = function(req,res){","    CommentThread.findOne({_id: req.query.commentId})","    .exec(function(err,comment){","        if(!comment){","            res.json(404,{msg: \"CommentThread Not found\"});","        } else {","            res.json(comment);","        }","    });","};","","exports.addComment = function(req,res){","    CommentThread.findOne({_id: req.body.rootCommentId})","    .exec(function(err, commentThread) {","        if(!commentThread){","            res.json(404,{msg: \"CommentThread Not Found\"});","        } else {","            var newComment = Reply(req.body.newComment);","            addComment(req,res, commentThread, commentThread,","            req.body.parentCommentId, newComment);","            ","            var User = mongoose.model('User');","            User.findOne({_id: req.session.user})","            .exec(function(err,user){","            newComment.username = user.username","            });","        }","    });","};","","function addComment(req,res, commentThread,currentComment, parentId,newComment){","    if(commentThread.id == parentId){","        commentThread.replies.push(newComment);","    } else {","        for (var i=0; i < currentComment.replies.length;i++){","            var c = currentComment.replies[i];","            if(c._id == parentId){","                c.replies.push(newComment);","                var replyThread = commentThread(req,res, commentThread);","                updateCommentThread(req,res,commentThread);","                break;","            } else {","                addComment(req,res,commentThread,c,parentId,newComment);","            }","        }","    }","}","","function updateCommentThread(req,res, commentThread){","    CommentThread.update({_id:commentThread.id},","    {$set:{replies:commentThread.replies}})","    .exec(function(err,savedComment){","        if(err){","            res.json(404,{msg:\"Failed to update commentThread\"});","        } else {","            res.json({msg:\"Updated Successfully\"});","        }","    });","}","","","","",""]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":14},"end":{"row":22,"column":15},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":13},"end":{"row":22,"column":14},"action":"remove","lines":["d"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":12},"end":{"row":22,"column":13},"action":"remove","lines":["a"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":12},"end":{"row":22,"column":13},"action":"insert","lines":["n"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":13},"end":{"row":22,"column":14},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":14},"end":{"row":22,"column":15},"action":"insert","lines":["w"]}]}],[{"group":"doc","deltas":[{"start":{"row":22,"column":12},"end":{"row":22,"column":22},"action":"remove","lines":["newComment"]},{"start":{"row":22,"column":12},"end":{"row":22,"column":22},"action":"insert","lines":["newComment"]}]}],[{"group":"doc","deltas":[{"start":{"row":36,"column":47},"end":{"row":37,"column":0},"action":"insert","lines":["",""]},{"start":{"row":37,"column":0},"end":{"row":37,"column":8},"action":"insert","lines":["        "]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":8},"end":{"row":37,"column":9},"action":"insert","lines":["u"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":8},"end":{"row":37,"column":9},"action":"remove","lines":["u"]},{"start":{"row":37,"column":8},"end":{"row":37,"column":29},"action":"insert","lines":["updateCommentThread()"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":28},"end":{"row":37,"column":29},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":29},"end":{"row":37,"column":30},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":30},"end":{"row":37,"column":31},"action":"insert","lines":["q"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":31},"end":{"row":37,"column":32},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":32},"end":{"row":37,"column":33},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":33},"end":{"row":37,"column":34},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":34},"end":{"row":37,"column":35},"action":"insert","lines":["s"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":35},"end":{"row":37,"column":36},"action":"insert","lines":[","]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":36},"end":{"row":37,"column":37},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":37},"end":{"row":37,"column":38},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":38},"end":{"row":37,"column":39},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":39},"end":{"row":37,"column":40},"action":"insert","lines":["m"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":36},"end":{"row":37,"column":40},"action":"remove","lines":["comm"]},{"start":{"row":37,"column":36},"end":{"row":37,"column":49},"action":"insert","lines":["commentThread"]}]}],[{"group":"doc","deltas":[{"start":{"row":37,"column":50},"end":{"row":37,"column":51},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":47},"end":{"row":43,"column":72},"action":"remove","lines":["(req,res, commentThread);"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":47},"end":{"row":43,"column":48},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":48},"end":{"row":43,"column":49},"action":"insert","lines":["r"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":49},"end":{"row":43,"column":50},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":48},"end":{"row":43,"column":50},"action":"remove","lines":["re"]},{"start":{"row":43,"column":48},"end":{"row":43,"column":55},"action":"insert","lines":["replies"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":55},"end":{"row":43,"column":56},"action":"insert","lines":["."]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":56},"end":{"row":43,"column":57},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":57},"end":{"row":43,"column":58},"action":"insert","lines":["o"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":58},"end":{"row":43,"column":59},"action":"insert","lines":["O"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":59},"end":{"row":43,"column":60},"action":"insert","lines":["b"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":60},"end":{"row":43,"column":61},"action":"insert","lines":["j"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":61},"end":{"row":43,"column":62},"action":"insert","lines":["e"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":62},"end":{"row":43,"column":63},"action":"insert","lines":["c"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":63},"end":{"row":43,"column":64},"action":"insert","lines":["t"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":64},"end":{"row":43,"column":66},"action":"insert","lines":["()"]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":65},"end":{"row":43,"column":65},"action":"insert","lines":[""]}]}],[{"group":"doc","deltas":[{"start":{"row":43,"column":66},"end":{"row":43,"column":67},"action":"insert","lines":[";"]}]}],[{"group":"doc","deltas":[{"start":{"row":51,"column":1},"end":{"row":51,"column":2},"action":"insert","lines":[";"]}]}]]},"ace":{"folds":[],"scrolltop":360,"scrollleft":0,"selection":{"start":{"row":29,"column":15},"end":{"row":29,"column":15},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1417464151006,"hash":"d36ffc9619d301a8cfcd26b09765f0722210d2f0"}
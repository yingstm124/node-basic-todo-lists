module.exports = {
    getHomePage: (req, res) => {
        let query = 'SELECT * FROM todos';

        db.query(query, (err, result) => {
            if(err){
                console.log(err);
                res.redirect('/');
            }
            else{
                res.render('home.ejs', {
                    title: 'Todos',
                    todos: result
                });
            }
        });
    },

    addTask : (req,res) => {

        let task = req.body.task;
        let query = "INSERT INTO `todos` (name) VALUES ?";
        //console.log(req.body.task);
        let value = [[task]];

        if(task != ""){
            db.query(query,[value],(err,result) => {
                if(err){
                    console.log(err);
                    return res.status(500).send(err);
                }
                res.redirect('/');

            });
        }
        else {
            console.log("text empty");
            res.send(500);
        }
    },

    deleteTask: (req, res) => {

        let taskId = req.params.id;
        let query = "DELETE FROM todos WHERE id= ?";

        db.query(query, [taskId], (err,result) => {
            if(err){
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
        
    }

};
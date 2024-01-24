const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalModael');
const User = require('../model/userModel');


//why not user throw-catch .then.catch ? becaus the asyncHandler is manage
const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
     res.status(200).json(goals);
});

const setGoals = asyncHandler (async (req, res) => {
    if(!req.body.text){
        res.status(400);
        throw new Error('pls enter text field');
    }
    const goal = await Goal.create({
        text: req.body.text,
        //you add new user in goal model so
        user: req.user.id,
    });
    res.status(200).json(goal);
});

const putGoals = asyncHandler (async (req, res) => {
          const goal = await Goal.findById(req.params.id);

          if(!goal){
            res.status(400);
            throw new Error('Goal not fount');
          }
           
          //////START
 
          //if user db la  illana;
          if(!req.user){
            res.status(401);
            throw new Error("User Not Found")
          }
          //which user create goal thus user rai edite delete panna allow pannanum
          //goal id, req.user.id is to help
          if (goal.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User Not Authorised")
          }
          /////END

          const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
          });

    res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler (async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if(!goal){
      res.status(400);
      throw new Error('Goal not fount');
    }
          //////START
          // // becaous the crud operation based on user || pupose db intha id irukka illlaiya nu kondanthu kodunkkum;
          // const user = await User.findById(req.user.id);
          //if user db la  illana;
          if(!req.user){
            res.status(401);
            throw new Error("User Not Found")
          }
          //which user create goal thus user rai edite delete panna allow pannanum
          //goal id, req.user.id is to help
          if (goal.user.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User Not Authorised")
          }
          /////END
    await goal.deleteOne();

    res.status(200).json({id: req.params.id});
});


module.exports = {
    getGoals,
    setGoals,
    putGoals,
    deleteGoals,
}
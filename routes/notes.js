const express=require('express')
const router=express.Router()
const fetchuser = require('../middleware/fetchuser');
const Notes=require('../models/Notes')
const { body, validationResult } = require('express-validator');



 router.get('/fetchallnotes',fetchuser,async (req,res)=>{
   try{

      const notes=await Notes.find( {user:req.user.id})
      res.json(notes)
   }
   catch(error){
      console.error(error.message);
      return res.status(500).send('Internal Server Error');
   }
})

router.post('/addnote',fetchuser,[
   body('title','enter a valid title').isLength({min:3}),
   body('description','description must have at least 5 characters').isLength({min:5})
] ,async(req,res)=>{
 try{
 const {title,description,tag}=req.body
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } 
  const note=new Notes({
   title,description,tag,user:req.user.id 
  })
  const savenote= await note.save()
  res.json(savenote)
 }
catch(error){
   console.error(error.message);
   return res.status(500).send('Internal Server Error');
}
})

router.put('/updatenote/:id', fetchuser , async (req, res) => {
   const{title,description,tag}=req.body
   // create a newnote object
  try{
   const newnote={};
   if(title){newnote.title=title};
   if(title){newnote.description=description};
   if(title){newnote.tag=tag};
 
   // finding the node to be updated and update it
   let note= await Notes.findById(req.params.id);
   if(!note){res.status(404).send("Note not found")}
   if(note.user.toString() !== req.user.id){
     return res.status(401).send("Access Denied!");
   }
 
   note=await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
   res.json(note)
  }
  catch(error){
   console.error(error.message);
   return res.status(500).send('Internal Server Error');
  }
 })



router.delete('/deletenote/:id', fetchuser , async (req, res) => {
   const{title,description,tag}=req.body
   try{

   // finding the node to be updated and update it
   let note= await Notes.findById(req.params.id);
   if(!note){res.status(404).send("Note not found")}
 
   if(note.user.toString() !== req.user.id){
     return res.status(401).send("Access Denied!");
   }
 
   note=await Notes.findByIdAndDelete(req.params.id)
   res.json({Success:"Note has been deleted"})
}
catch(error){
   console.error(error.message);
   return res.status(500).send('Internal Server Error');
  }
 })


module.exports=router
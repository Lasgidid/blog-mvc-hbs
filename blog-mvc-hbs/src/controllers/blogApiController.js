const Blog = require('../models/Blog');

 exports.getBlog = async (req,res,next) =>{
    try{
        const blogs = await Blog.find().sort({ createAt: -1});
        res.json(blogs);
    } catch (e) {next(e);}
 }; 

 exports.getBlogById = async (req,res,next)=>{
    try{
        constblog = await Blog.findById(req.params.id)
        if (!blog) return res.status(404).json({message:'Blog not found'});
        res.json(blog);
    } catch(e){next(e);}
 };

 exports.createBlog = async (req,res,next)=>{
    try{
       const blog = await Blog.create({
              title: req.body.title, 
              body: req.body.body,
             author:req.body.author});
     res.status(201).json(blog);
    }  catch(e) {next(e);}
}


 exports.updateBlog = async (req,res,next)=>{
    try{
       const blog = await Blog.findByIdAndUpdate( req.params.id,{
              title: req.body.title, 
              body: req.body.body,
             author:req.body.author},
             {new:true, runValidators:true}
            );
             if (!blog) return res.status(404).json({message:'Blog not found'})
      res.json(blog)
    }  catch(e) {next(e);}
};



 exports.deleteBlog = async (req,res,next)=>{
    try{
       const blog = await Blog.findByIdAndDelete(req.params.id,);
    if (!blog) return res.status(404).json({message:'Blog not found'});
    res.json({ message:'Deleted'});
    }  catch (e) {next(e);}
}
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const Post = require('../models/Post')


// Welcome Page 
router.get('/', forwardAuthenticated, async (req,res)=>res.render('welcome'));

// Dashboard  
router.get('/dashboard',ensureAuthenticated, async (req,res)=>{
	try{
		const posts = await Post.find();
		res.render('dashboard', {	
   	   		 name: req.user.name,
   	   		 posts: posts
  		})
	} catch(err){
		res.json({message:err});
	}
});
// post dashboard
router.post('/dashboard', async (req,res) =>{
	const post = new Post({
		name: req.body.titulo,
		description: req.body.description
	});
	try{
		const savedPost = await post.save();
	}catch(err){
		errors.push({msg: 'Por favor preencher titulo e descrição!'});

	}
	res.redirect('/dashboard');
});

// Delete one posthttps://github.com/guivahl/sprint2hut8
router.get('/dashboard/delete/:postId', async (req,res)=>{
			try{
				const removedPost = await Post.deleteOne(
 			  { _id: req.params.postId},res.redirect('/dashboard'));
			} catch(err){
				console.log({ message: err});
			}
});
//get patch page
router.get('/dashboard/patch/:postId', async (req,res)=>{
			try{
				const p = await Post.findById(req.params.postId);
				res.render('patch',{titulo: p.name,
					p: p});
			} catch(err){
				console.log(err);
			}
});
//post patch page
router.post('/dashboard/patch/:postId', async (req,res)=>{
			try{
				const updatedPost = await Post.updateOne(
					{ _id: req.params.postId },
						{ $set: {
							name: req.body.patchtitulo,
							description: req.body.patchdesc}}
			);
			} catch(err){
				res.json({ message: err});
			}
			res.redirect('/dashboard');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// Read all the posts
router.get('/', async (req,res)=>{
	try{
		// res.send('You are on posts!');
	//	let posts = [];
		const posts = await Post.find().limit(3).sort({date:-1});
		res.json(posts);
	} catch(err){
		res.json({message:err});
	}
});


// Submit a post
router.post('/', async (req,res) =>{
	console.log(req.body);
	const post = new Post({
		name: req.body.name,
		description: req.body.description,
		date: req.body.date
	});
	try{
		const savedPost = await post.save();
		res.json(savedPost);
	}catch(err){
		res.json({message: err});
	}
});

// Read one post
router.get('/:postId', async (req,res)  =>{
	try{
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch(err){
		res.json({ message: err});
	}
});

// Delete one post
router.delete('/:postId', async (req,res)=>{
	try{
		const removedPost = await Post.remove({_id: req.params.postId})
		res.json(removedPost);
	} catch(err){
		res.json({ message: err});
	}
});

//Update one post
router.patch('/:postId', async (req,res)=>{
	try{
		const updatedPost = await Post.updateOne(
			{ _id: req.params.postId },
			{ $set: {name: req.body.name,
					description: req.body.description,
					date: req.body.date}}
			);
		res.json(updatedPost);
	} catch(err){
		res.json({ message: err});
	}
});
module.exports = router; // exporting this router
//,description: req.body.description,
//					date: req.body.date

const express = require('express');
const router = express.Router();


const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./models');

function sunnyDay() {
    return 'Every morning I eat a bagel with cereal and have a cup of coffee.'}

function goodPasta(){
    return 'every day that I go to work I lead a team of skilled individuals to package high quality pasta for Japan.'
}

BlogPosts.create('This morning', sunnyDay(), 'Bob Brown');
BlogPosts.create('At Work', goodPasta(), 'Shane Weickum');

router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleting Blogpost \`${req.params.ID}\``);
    res.status(204).end();
});

router.post('/', jsonParser, (req,res) => {
    const requiredFields = ["title", "content", "author"];
    for (let i = 0; i < requiredFields.length; i++){
        const fields = requiredFields[i];
        if(!(field in req.body)){
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);

        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

router.put('/:id', jsonParser, (req, res)=> {
const requireFields = ["id","title", "content", "author", "publishDate"];
for (let i = 0; i < requiredFields.length; i++){
    const field = requiredField[i];
    if(!(field in req.body)){
        const message =  `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
    }
}
if(req.params.id !== req.body.id){
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`
    console.error(message);
    return res.status(400).send(message);
}
console.log(`Updating BlogPost \`${req.params.id}\``);
const updatePost = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
});
res.status(204).json(updatePost);
});



module.exports = router;
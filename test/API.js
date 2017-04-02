const chai = require('chai');

const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use('http');

describe(BlogPosts, function(){


before(function(){
    return runServer();
});



after(function(){
    return closeServer();
});

it('should get BlogPosts on GET', function(){
    return chai.request(app)
    .get('/BlogPosts')
    .then(function(res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);

        const expectedKeys = ["id","title", "content", "author"];
        res.body.forEach(function(item){
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
        })
    });
});
it('should add a BlogPost on POST', function(){
  const newBlog = {title: 'sunny day', content: 'one sunny day', author: 'shane weickum'};
  return chai.request(app)
  .post('/BlogPosts')
  .send(newBlog)
  .then(function(res){
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.include.keys('id', 'title', 'content', 'author');
    res.body.id.should.not.be.null;

    res.body.should.deep.equal(Object.assign(newRecipe, {id: res.body.id}));

  });
});

it('should update BlogPosts on PUT', function(){


  const updateData = {
    title: 'saturday morning',
    content: 'this saturday morning I woke up with my kids, had coffee and turned on saturday morning cartoons.',
    author: 'Shane Weickum'
  };

  return chai.request(app)
  .get('/BlogPosts')
  .then(function(res){
    updateData.id = res.body[0].id;


    return chai.request(app)
    .put(`/BlogPosts/${updateData.id}`)
    .send(updateData);
  })

  .then(function(res){
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.deep.equal(updateData);
  });
});

it('should delete BlogPosts on DELETE', function(){
  return chai.request(app)

  .get('/BlogPosts')
  .then(function(res){
    return chai.request(app)
    .delete(`/BlogPosts/${res.body[0].id}`);
  })
  .then(function(res) {
    res.should.have.status(204);
      });
  });
});



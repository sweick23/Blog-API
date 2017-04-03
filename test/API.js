const chai = require('chai');

const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('BlogPosts', function(){


before(function(){
  return runServer();
});



after(function(){
  return closeServer();
});

it('should get BlogPosts on GET', function(){
    return chai.request(app)
    .get('/apiRouter')
    .then(function(res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);

        const expectedKeys = ["id","title", "content", "author", "publishDate"];
        res.body.forEach(function(item){
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
        })
    });
});
it('should add a BlogPost on POST', function(){
  const newBlog = {title: 'sunny day', content: 'one sunny day', author: 'shane weickum'};
  return chai.request(app)
  .post('/apiRouter')
  .send(newBlog)
  .then(function(res){
    res.should.have.status(201);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.be.all.keys('id', 'title', 'content', 'author', 'publishDate');
    res.body.id.should.not.be.null;

    res.body.should.deep.equal(Object.assign(newBlog, {id: res.body.id, publishDate: res.body.publishDate}));

  });
});

it('should update BlogPosts on PUT', function(){


  return chai.request(app)
  .get('/apiRouter')
  .then(function(res){
    
function saturdayMorning(){
    return 'every saturday morning i wake up and have coffee and turn on the saturday morning cartoons for my kids'
}

  const updateData = Object.assign(res.body[0], {
    title: 'saturday morning',
    content: saturdayMorning()
    
    
  });
    
  });
    return chai.request(app)
    .put(`/apiRouter/${res.body[0].id}`)
    .send(updateData)
 
  .then(function(res){
    res.should.have.status(204);
    res.should.be.json;
    res.body.should.be.a('object');
    res.body.should.deep.equal(updateData);
  
  });
});

it('should delete BlogPosts on DELETE', function(){
  return chai.request(app)

  .get('/apiRouter')
  .then(function(res){
    return chai.request(app)
    .delete(`/apiRouter/${res.body[0].id}`);
  })
  .then(function(res) {
    res.should.have.status(204);
      });
  });
}); 







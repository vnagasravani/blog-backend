const express = require ('express');
const blogController = require('./../controllers/BlogController');
const authmw = require('./../middleware/authMiddleWare')

let setRouter = (app)=>{
  app.post('/article', authmw.isAuthorised , blogController.createBlog);
  app.get('/article', blogController.getBlogs);
}

module.exports={
    setRouter:setRouter
}
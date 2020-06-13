const express = require('express');
const mongoose = require('mongoose');
const validation = require('./../libs/paramsValidationLib');
const response = require('./../libs/responseLib');
const check = require('./../libs/checkLib');
const logger = require('pino')();
const shortid = require('shortid');

let blogModel = mongoose.model('BlogModel');

let createBlog = (req, res) => {
          blogModel.find({ title: req.body.title }, (err, result) => {
                if (err) {
                    let apiResponse = response.generate(true, 'Failed To find articles', 500, null);
                    res.send(apiResponse)
                }
                else {
                    if(check.isEmpty(result))
                    {
                        let newBlog = new blogModel({
                            blogId: shortid.generate(),
                            title: req.body.title,
                            author: req.body.author,
                            body: req.body.body,
                            createdOn: Date.now()
                        })
    
                        newBlog.save((err, result) => {
                            if (err) {
                                let apiResponse = response.generate(true, 'failed to create an article', 500, null)
                                res.send(apiResponse)   
                            }
                            else {
                                let apiResponse = response.generate(false, 'new article created', 201, result)
                                res.send(apiResponse) 
                            }
                        })
    

                    }
                    else
                    {
                        let apiResponse = response.generate(true, 'An article already exists with same name', 400, null)
                        res.send(apiResponse)     
                    }
                    
                }
            })
    
} //end createBlog



let getBlogs =  (req,res)=>{
    blogModel.find({},(err,result)=>{
        if(err){
            let apiResponse = response.generate(true, 'Failed To get articles', 500, null)
            res.send(apiResponse) 
        }
        else{
            let apiResponse = response.generate(false, 'blogs found', 200, result)
             res.send(apiResponse)  
        }
    })
}//end getBlogs


module.exports = {
    createBlog : createBlog,
    getBlogs:getBlogs
}

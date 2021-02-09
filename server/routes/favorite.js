const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {  // 콜백함수로 보내준 Variables를 받는다
    // mongo에서 favorite 가져오기
    Favorite.find( {"movieId": req.body.movieId} ) // bodyparser로 받음
        .exec((err, info) => {
            if(err) return res.status(400).send(err)

            res.status(200).json({ success: true, favoriteNumber: info.length }) // info.length는 몇명이 이영화에 좋아요를 눌렀는지 나타낸다. 
        })
})

router.post('/removeFromFavorite', (req, res) => {  // 콜백함수로 보내준 Variables를 받는다
    // mongo에서 favorite 지워주기
    Favorite.findOneAndDelete({ movieId:req.body.movieId, userFrom: req.body.userFrom})
        .exec((err, doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, doc })
        })
})

router.post('/addToFavorite', (req, res) => {  // 콜백함수로 보내준 Variables를 받는다
    // mongo에 favorite 저장하기
    const favorite = new Favorite(req.body)
    favorite.save((err, doc) => {
        if(err) return res.status(400).send(err)

        return res.status(200).json({ success: true })
    })
})

router.post('/getFavoriteMovie', (req, res) => {  // 콜백함수로 보내준 Variables를 받는다
    // 저장된 나의 좋아하는 영화를 가져온다. 
    Favorite.find({ "userFrom": req.body.userFrom })
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({ success: true, favorites })
        })
    
})


module.exports = router;

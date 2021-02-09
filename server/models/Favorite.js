const mongoose = require('mongoose');
const Schema = mongoose.Schema


const favoriteSchema = mongoose.Schema({
    userFrom : {
        type: Schema.Types.ObjectId, // 모든 정보를 가져오기 위한 방법 누가 좋아요를 눌렀는지!
        ref: 'User'
    },
    movieId : {
        type: String
    },
    movieTitle : {
        type: String
    },
    moviePost : { 
        type: String
    },
    movieRuntime : { 
        type: String
    }
}, { timestamps : true }) // 저장한 시간을 기록해줍니다.


const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = { Favorite }
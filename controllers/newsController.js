const {default: axios} = require('axios');

// function newsCallback(url, callback){
//     axios.get(url).then(resp => {
//         callback(null, resp.sources);
//     }).catch(err =>{
//         callback(err,null);
//     })
// }


function newsPromise(url){
    return new Promise((resolve, reject)=>{
        axios.get(url).then(resp => {
            return resolve(resp.data.sources);
        }).catch(err => {
            return reject(err);
        })
    })
}

module.exports ={newsPromise};
let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let random = Math.round(Math.random() * 100);
        if (random > 50) {
            resolve(random);
        } else {
            reject(random);
        }
    }, 2000);
 }); 
 
 // console.log(myPromise); 
 
 myPromise
     .then(function(value){
         console.log('resolved',value);
     })
     .catch(function(value){
         console.log('rejected',value); 
     });
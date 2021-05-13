import axios from 'axios'


export class PostsAPI {
    //post request
  submitPosts = (data) => {
    return new Promise(function(resolve,reject) {
      const url = "https://jsonplaceholder.typicode.com/posts"//fake post api for testing
      const options = {
              method: 'POST',
              body: data,
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }
        axios.post(url,options)
        .then((res) => {return res.data.body})
        .then((response) => {
          resolve(response)
        })
        .catch(error => console.log(error))
       
    })
  }
}

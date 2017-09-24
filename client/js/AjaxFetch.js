import $ from 'jquery'

export default (url) => {
    return new Promise((resolve, reject) => {
        $.ajax({url: url, success: (result) => {
            console.log(result)
            resolve(result)
        }, error: ({error}) => {
            reject(error)
        }})
    })
}
import axios, {AxiosError} from 'axios';

const sellSong = async (songId:string, buyerId: string) => {
    try {
        return  axios.post('https://hw98hsmeh2.execute-api.eu-central-1.amazonaws.com/prod/sell-song', {
            "song-id": songId,
            "buyer-id": buyerId,
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (value)=>
            {
                return  value.data
            }
        ).catch(function (error) {
            alert('Error')
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                alert(error.response.data);
                alert(error.response.status);
                alert(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser
                // and an instance of http.ClientRequest in node.js
                alert(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(error.message);
            }

        })

    } catch (error) {
        console.log(error)
    }
};

const OnBuyClick = async (song_id: string, user_id: string|undefined) => {

    const response = await sellSong(song_id, user_id?user_id:'')
    window.open(response['payment_link']);
    return response
}

export default OnBuyClick;
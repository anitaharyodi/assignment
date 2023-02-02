import axios from "axios";

export default axios.create({
    headers: {
        Authorization : `Bearer 937884dfd63cbd7b133f351ddd9dfa4829c8fd863dd5b3d70e1ee3f894c3649e`
    },
    baseURL: 'https://gorest.co.in/public/v2/'
})
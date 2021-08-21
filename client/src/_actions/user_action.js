import axios from "axios";
import {
    REGISTER_USER
} from './type'
export function registerUser(dataToSubmit){
    
    const request = axios.post('/api/register/register',dataToSubmit)
        .then(response => 
            response.data
)

        return{
            type: REGISTER_USER,
            payload: request
        }
}

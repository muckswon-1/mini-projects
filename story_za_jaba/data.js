import {v4 as uuidv4} from 'uuid';
import { formatTimestamp } from './src/utils/utils';
const PASSWORD = import.meta.env.VITE_PASSWORD;

console.log(PASSWORD);

export const POSTS = [
    {
        id : 1,
        userId : 1,
        username : 'muckswon',
        title : 'Lorem Ipsum',
        content : 
            'Tukimuok warazi wanabuya  Govana, wakidigi ni lagunya (Militan)Donga gota nikuliet mashashola Senke ikiriet ni kihuti Kuwachai, kuwakata tukizied Smady, Militan kuwabugda (Bugda) Wakimuok, hatunauwo kusafisha (Hatunawuo) Wakimuok, hatunauwo kusafisha',
       
        timePosted : formatTimestamp(Date.now()),
        likes : [],
        dislikes : [],
        comments : [ ] 
    },
  
];


const admin =  {
        id : 1,
        username : 'muckswon',
        email : 'muckswon@gmail.com',
        password : PASSWORD,
        profilePic : null,
        followers : [],
        following : [],
        
    }

const admin2 = {
         id : 2,
        username : 'muckswon2',
        email : 'muckswon2@gmail.com',
        password : PASSWORD,
        profilePic : null,
        followers : [],
        following : [],
}





export const USERS = [

    admin, admin2

]
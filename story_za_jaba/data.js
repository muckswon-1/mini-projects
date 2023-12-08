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
        parentId : null,
        likes : [],
        dislikes : [],
    },
  
];

export const COMMENTS = [
    {
        id : 1,
        parentId :  null,
        userId : 2,
        postId : 1,
        content : 'Ngori sana',
        likes : [],
        dislikes : [],
        timePosted : formatTimestamp(Date.now())

    },
    {
        id : 10,
        userId : 1,
        parentId : 1,
        postId : null,
        content : 'Ama vipi',
        likes : [],
        dislikes : [],
        timePosted : formatTimestamp(Date.now())
    },
     {
        id : 100,
        userId : 2,
        parentId : 10,
        postId : null,
        content : 'Leo umeninotice nimenice',
        likes : [],
        dislikes : [],
        timePosted : formatTimestamp(Date.now())
    }
]


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


const admin3 = {
         id : 3,
        username : 'ada',
        email : 'ada@gmail.com',
        password : PASSWORD,
        profilePic : null,
        followers : [],
        following : [],
}





export const USERS = [

    admin, admin2, admin3

]
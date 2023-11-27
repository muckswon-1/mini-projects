import {v4 as uuidv4} from 'uuid';
import { formatTimestamp } from './src/utils/utils';

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
        password : 'Adn$3202',
        profilePic : null,
        following : ['muckswon2']
    }





export const USERS = [

    admin,

]
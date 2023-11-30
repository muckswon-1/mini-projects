 import sortBy from "sort-by";
 import { v4 as generateId } from 'uuid';
 import _ from 'lodash';

 export const fetchUser = (users,username) => {
    const currentUser  = users.find(user => {
        return user.username === username
    })

    if(currentUser){
        return currentUser
    }

    return null;
}

export const checkPassword = (user,password) =>{
   
    return user.password === password;
  
}

export const fetchTopPosts = (posts) => {

    posts.sort(sortBy('-likes','-timePosted'))
    if(posts.length > 1000) {
       return  posts.slice(0,1000);
    }

    return posts;
}




 export function isUnique(array, property, value) {
  return !array.some(item => item[property] === value);
}


 export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);

  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month} ${day} ${hours}:${minutes}`;
};



 export function hasEmptyOrNullValues(obj) {
    return _.isEmpty(obj) || Object.values(obj).some(value => value === null)
}



export const createPostFromObject = (postObject) => {
  const {
    id = generateId(),
    userId = '',
    username = '',
    title = '',
    content = '',
    timePosted = formatTimestamp(new Date().toISOString()),
    likes = [],
    dislikes = [],
    comments = [],
  } = postObject;

  return {
    id,
    userId,
    username,
    title,
    content,
    timePosted,
    likes,
    dislikes,
    comments,
  };
};


export const findUserById = (users, userId) => {
    
   
    const findIndex = users.findIndex(user => {
       return  user.id === userId
    });

    if(findIndex !== -1){
        return users[findIndex]
    }
}


export const sendNotifiction = (message) => {
  if(!("Notification" in  window)){
    alert("This browser does not supprt desktop notifications. ")
  }else if(Notification.permission === "granted"){
    const notification =  new  Notification(message);
    
  }
}




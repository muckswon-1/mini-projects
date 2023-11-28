import { createSlice } from "@reduxjs/toolkit";
import { POSTS } from "../../../data";


export const postsSlice = createSlice({
    name : 'posts',
    initialState:  {
        posts : POSTS
    },
    reducers : {
        addPost : (state, action) => {
            state.posts.push(action.payload)
        },

        likePost : (state,action) => {
            const {id, userId } = action.payload;

            const likedPostIndex = state.posts.findIndex(aPost => {
                return aPost.id === id
            });

    

             if(likedPostIndex !== -1){
                const likedPost = {...state.posts[likedPostIndex]};
                 const alreadyLiked = likedPost.likes.includes(userId);

                if(!alreadyLiked) {
                   
                    likedPost.likes.push(userId);
                    state.posts[likedPostIndex] = likedPost;
                }
                
            }



    
            // likedPost.likes.push(action.payload);

            // const otherPosts = state.posts.filter(post => {
            //     post.id !== likedPost.id;
             //});

            // otherPosts.push(likedPost);
            // state.posts = otherPosts;
            
        },
        dislikePost : (state, action) => {

            const {id, userId } = action.payload;

            const disLikedPostIndex = state.posts.findIndex(aPost => {
                 return aPost.id === id
            });

            console.log(disLikedPostIndex);

            if(disLikedPostIndex !== -1){
                const dislikedPost = {...state.posts[disLikedPostIndex]};

                const alreadyDisliked = dislikedPost.dislikes.includes(userId);

                if(!alreadyDisliked){
                    dislikedPost.dislikes.push(userId);
                    state.posts[disLikedPostIndex] = dislikedPost;
                }
            }
        

            // const disLikedPost = state.posts.find(aPost => {
            //     return aPost.id === postId
            // });

        

            // disLikedPost.dislikes.push(action.payload);

            // const otherPosts = state.posts.filter(post => {
            //     post.id !== disLikedPost.id
            // });

            // otherPosts.push(disLikedPost)
            
            // state.posts = otherPosts;

        },
        commentOnPost : (state,action) =>{
            const comment = action.payload;
             const commentedPostIndex = state.posts.findIndex(aPost => {
                 return aPost.id === comment.postId;
            });

            console.log(commentedPostIndex);

            if(commentedPostIndex !== -1){
                const commentedPost = {...state.posts[commentedPostIndex]};
                commentedPost.comments.push(comment);
                state.posts[commentedPostIndex] = commentedPost;
               
            }

        },
        editPostUsername : (state,action)=>{

            const user = action.payload

             state.posts.forEach((post) => {
                    if(post.userId === user.id){
                        post.username = user.username
                    }
                })

        }
    }
})

export const {addPost, likePost, dislikePost, commentOnPost, editPostUsername} = postsSlice.actions;
export const selectPosts = state => state.posts.posts;

export default postsSlice.reducer;
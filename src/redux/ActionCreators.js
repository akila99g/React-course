import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment = (dishId, rating, author, comment)=> (dispatch) => {
    //create comment object using input parameters
    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    };

    //add date to the comment object
    newComment.date = new Date().toISOString();

    //http post
    return fetch(baseUrl + 'comments' , {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    //handle promises from fetch
    .then(response => {
        if(response.ok)
            return response
        else{
            var error = new Error('Error '+ response.status + ' : ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    (error)=>{
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
}

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errMess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errMess
})

//thunk (function that returns a function)
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if(response.ok)
                return response
            else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        (error)=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}

export const fetchComments = () => (dispatch) => {

    return fetch(baseUrl + 'comments')
        .then(response => {
            if(response.ok)
                return response
            else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        (error)=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const commentsFailed = (errMess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
})

export const fetchPromos = () => (dispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if(response.ok)
                return response
            else{
                var error = new Error('Error '+ response.status + ' : ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        (error)=>{
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errMess
})
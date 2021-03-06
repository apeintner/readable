import { fetchPosts, savePostToApi, saveEdittedPostToApi, removePost, votePostInApi, fetchComments, deleteComment } from '../helpers/api'

const FETCHING_POSTS = 'FETCHING_POSTS'
const RECIEVED_POSTS = 'RECIEVED_POSTS'
const SORT_POSTS = 'SORT_POSTS'
const VOTE_POST = 'VOTE_POST'
const SAVED_POST = 'SAVED_POST'
const DELETED_POST = 'DELETED_POST'
const EDITED_POST = 'EDITED_POST'

function fetchingPosts() {
    return {
        type: FETCHING_POSTS
    }
}

function savedPost(post) {
    return {
        type: SAVED_POST,
        post
    }
}


function deletedPost(id) {
    return {
        type: DELETED_POST,
        id
    }
}

function editedPost(post) {
    return {
        type: EDITED_POST,
        post
    }
}


export function recievedPosts(posts) {
    return {
        type: RECIEVED_POSTS,
        posts
    }
}

export function votedPost(post, vote) {
    return {
        type: VOTE_POST,
        post,
        vote
    }
}
export function votePost(id, vote) {
    return function (dispatch) {
        votePostInApi(id, vote).then((post) => {
            return dispatch(votedPost(id, vote))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function getPosts() {
    return function (dispatch) {
        dispatch(fetchingPosts())
        fetchPosts().then(( posts ) => {
            return dispatch(recievedPosts(posts))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function deletePost(id) {
    fetchComments(id).then((comments) => { 
        comments.forEach(comment => {
            deleteComment(comment.id)
        });
    });
    return function (dispatch) {
        removePost(id).then((post) => {
            return dispatch(deletedPost(post.id))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function savePost(post) {
    return function (dispatch) {
        savePostToApi(post).then((post) => {
            return dispatch(savedPost(post))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function editPost(post) {
    return function (dispatch) {
        saveEdittedPostToApi(post).then((post) => {
            return dispatch(editedPost(post))
        }).catch((err) => {
            console.error(err)
        })
    }
}

export function changeSortOn(sorting) {
    return {
        type: SORT_POSTS,
        sorting
    }
}

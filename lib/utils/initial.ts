export const INITIAL_POST = { // initial post data instead of making the post nullable
    _id: '',
    author: '',
    photo: '',
    content: '',
    likes: [],
    tags: [] ,
    comments: []
}

export const INITIAL_USER = {
    _id: '',
    firstname: '',
    lastname: '',
    username: '',
    followers: [''],
    following: [''],
    profilephoto: '',
    headerphoto: '',
}

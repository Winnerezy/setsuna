declare type Post = {
  _id: string;
  author: string;
  photo: string;
  content: string;
}

declare type PostCard = {
  content: string;
  author: string;
  photo: string | null;
  id: string;
  likes: string[];
  dislikes: string[];
};

declare type CustomButton = { 
    type: string,
    isLoading: boolean;
};

declare type User = {
  firstname: string,
  lastname: string,
  username: string,
  following: string[],
}
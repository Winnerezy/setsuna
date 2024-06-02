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
};

declare type CustomButton = { 
    type: string,
    isLoading: boolean;
};
declare type Post = {
  _id: string;
  content: string;
  author: string;
  photo: string | null;
  likes: string[];
  comments: IComment[];
}

declare type CustomButton = { 
    type: string,
    isLoading: boolean;
};

declare type User = {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  following: string[];
  profilephoto: string;
}

declare type IContextType = {
  user: User;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

declare type IComment = {
  author: string,
  comment: string
}
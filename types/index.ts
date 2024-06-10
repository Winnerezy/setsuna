declare type Post = {
  _id: string;
  content: string;
  author: string;
  photo: string | null;
  likes: string[];
  tags: string[];
  comments: IComment[];
  createdAt: string;
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
  followers: string[];
  following: string[];
  profilephoto: string;
  headerphoto: string;
}

declare type IContextType = {
  user: User | null;
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

declare type UserCard = {
  username: string;
  profilephoto: string;
  followers: string[];
}


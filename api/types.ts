export interface News {
    id:number;
    title: string;
    description: string | null;
    image: string | null;
    created_at: string;
}

export interface NewsMutation {
    title: string;
    description: string | null;
    image: string | null;
}

export interface Comment {
    id: number;
    news_id: number;
    author: string;
    text: string;
}

export interface CommentMutation {
    news_id: number;
    author: string;
    text: string;
}
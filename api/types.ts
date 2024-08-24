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
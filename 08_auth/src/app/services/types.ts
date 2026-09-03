export interface Author {
    id: number;
    biography: string;
    name: string;
    image: string | null;
    country: string;
    birth_date: string;
}

export interface Book {
    id: number;
    title: string;
    image: string | null;
    rating: number;
    price: number;
    author: Author;
    description: string | null;
    number_of_pages: number;
    publish_date: number;
    authorId: number;
}

export interface Login {
    email: string;
    password: string;
}

export interface ListPayload<T> {
    items: T[];
    page: number;
    page_size: number;
    total_items: number;
    total_pages: number;
}

export interface ApiResponse<T> {
    message: string;
    success: boolean;
    payload: T;
}
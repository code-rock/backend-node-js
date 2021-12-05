export type TBookReview  = { 
    username: string; 
    text: string 
}

export default interface IBook {
    title: string;
    authors: string;
    description: string;
    favorite: string;
    fileCover: string;
    fileName: string;
    fileBook: string;
    reviews: Array<TBookReview>;
}
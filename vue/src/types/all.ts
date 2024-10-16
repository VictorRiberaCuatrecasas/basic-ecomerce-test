export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        name: string;
        slug: string;
    };
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

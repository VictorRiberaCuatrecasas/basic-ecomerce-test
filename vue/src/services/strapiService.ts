import { Product, Category } from '../types/all';

const apiToken = import.meta.env.VITE_STRAPI_API_TOKEN;
const itemCountLimit = 50;

export const fetchCategorySlugs = async (): Promise<string[]> => {
    try {
        const response = await fetch('http://localhost:1337/api/categories', {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });
        const data = await response.json();
        return data.data.map((category: any) => category.slug);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const fetchCategoryBySlug = async (slug: string): Promise<Category | null> => {
    try {
        const response = await fetch(`http://localhost:1337/api/categories?filters[slug][$eq]=${slug}&populate[products][populate]=*`, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch category. Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.data.length > 0) {
            const category = data.data[0];
            return {
                id: category.id,
                name: category.name,
                slug: category.slug,
                description: category.description || '',
                categoryImgUrl: category.categoryImgUrl || '',
                products: category.products || [],
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        return null;
    }
};

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await fetch('http://localhost:1337/api/categories?populate=products[populate]=rating', {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories. Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data.map((category: any) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            products: category.products || [],
        }));
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const fetchStrapiProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch('http://localhost:1337/api/products?pagination[limit]=400&populate[category]=*&populate[rating]=*', {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products. Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data.map((item: any) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            description: item.description,
            category: {
                name: item.category.name,
                slug: item.category.slug,
            },
            image: item.image || '',
            rating: {
                rate: item.rating?.rate || null,
                count: item.rating?.count || null,
            },
        }));
    } catch (error) {
        console.error('Error fetching products from Strapi:', error);
        return [];
    }
};

export const seedStrapiWithFakeApi = async (products: Product[]): Promise<void> => {
    for (const product of products) {
        try {
            const categoryResponse = await fetch(`http://localhost:1337/api/categories?filters[name][$eq]=${product.category}`, {
                headers: {
                    Authorization: `Bearer ${apiToken}`,
                },
            });
            const categoryData = await categoryResponse.json();

            if (categoryData.data.length === 0) {
                console.error(`No category found for: ${product.category.name}`);
                continue;
            }

            const categoryId = categoryData.data[0].id;

            await fetch('http://localhost:1337/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiToken}`,
                },
                body: JSON.stringify({
                    data: {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        category: categoryId,
                        image: product.image,
                        rating: {
                            rate: parseInt(product.rating.rate.toString(), 10),
                            count: product.rating.count,
                        },
                        productId: product.id,
                    },
                }),
            });
        } catch (error) {
            console.error(`Error seeding product ${product.title} to Strapi:`, error);
        }
    }
};

export const fetchFakeApiProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products?limit=${itemCountLimit}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching products from Fake API:', error);
        return [];
    }
};

export const duplicateProduct = (product: Product): Product => ({
    ...product,
    id: product.id + 1000,
    title: `DUPLICATED ${product.title}`,
});

export const loadProducts = async (): Promise<Product[]> => {
    let allProducts: Product[] = [];
    let strapiProducts = await fetchStrapiProducts();

    if (strapiProducts.length === 0) {
        const fakeApiProducts = await fetchFakeApiProducts();
        fakeApiProducts.forEach((product) => allProducts.push(product, duplicateProduct(product)));
        await seedStrapiWithFakeApi(allProducts);

        strapiProducts = await fetchStrapiProducts();
    }

    return strapiProducts;
};

export const fetchProductIds = async (): Promise<string[]> => {
    try {
        const response = await fetch('http://localhost:1337/api/products?pagination[limit]=400', {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch product IDs. Status: ${response.status}`);
        }

        const data = await response.json();

        return data.data.map((product: any) => product.id.toString());
    } catch (error) {
        console.error('Error fetching product IDs from Strapi:', error);
        return [];
    }
};

import { createRouter, createWebHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import Home from '../pages/HomePage.vue';
import Cart from '../pages/CartPage.vue';
import Checkout from '../pages/CheckoutPage.vue';
import ProductDetail from '../pages/ProductDetail.vue';
import ProductList from '../pages/ProductList.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import NotFound from '../pages/NotFound.vue';

// Valid categories and item IDs
const validCategories = ['electronics', 'furniture', 'clothing'];
const validItemIds = ['item1', 'item2', 'item3'];


const isValidCategory = (categoryName: string): boolean => validCategories.includes(categoryName);
const isValidItemId = (itemId: string): boolean => validItemIds.includes(itemId);

const redirectTo404 = (path: string) => {
  return path.startsWith('/admin') ? '/admin/404' : '/404';
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: Home },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout },
      { path: ':categoryName', component: ProductList },
      { path: ':categoryName/:itemId', component: ProductDetail },
      { path: '404', component: NotFound },
    ],
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: '', component: Home },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout },
      { path: ':categoryName', component: ProductList },
      { path: ':categoryName/:itemId', component: ProductDetail },
      { path: '404', component: NotFound },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: (to) => redirectTo404(to.path),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard to validate parameters
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const { categoryName, itemId } = to.params as { categoryName?: string; itemId?: string };

  if (categoryName && !isValidCategory(categoryName)) {
    return next(redirectTo404(to.path));
  }

  if (itemId && !isValidItemId(itemId)) {
    return next(redirectTo404(to.path));
  }

  next();
});

export default router;

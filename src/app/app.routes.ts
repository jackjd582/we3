import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',

        loadComponent: () =>
            import('./layout/main/main')
                .then(m => m.Main),

        children: [

            {
                path: '',

                loadComponent: () =>
                    import('./page/home/home')
                        .then(m => m.Home)

            },
              {
                path: 'products',

                loadComponent: () =>
                    import('./page/product/product')
                        .then(m => m.Product)

            },
            {
                path: 'product-detail/:id',

                loadComponent: () =>
                    import('./page/product-detail/product-detail')
                        .then(m => m.ProductDetail)

            },
           
            {
                path: 'about',

                loadComponent: () =>
                    import('./page/about/about')
                        .then(m => m.About)

            }, {
                path: 'contact',

                loadComponent: () =>
                    import('./page/contact/contact')
                        .then(m => m.Contact)

            },

        ]

    }
];
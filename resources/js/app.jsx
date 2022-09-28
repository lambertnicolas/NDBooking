import './bootstrap';
import '../css/app.css';
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import React from 'react';
import Title from './Pages/Title';
import Footer from './Pages/Footer';

createInertiaApp({
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<div className="App" style={{
            backgroundImage: `url("https://cdn.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_960_720.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        }}><Title /><App {...props} /><br /><Footer /></div>);
    },
});

// import './bootstrap';
// import '../css/app.css';
//
// import React from 'react';
// import { render } from 'react-dom';
// import { createInertiaApp } from '@inertiajs/inertia-react';
// import { InertiaProgress } from '@inertiajs/progress';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import Title from './Pages/Title';
// import Footer from './Pages/Footer';
//
// const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'NDBooking';
//
// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
//     setup({ el, App, props }) {
//         return render(<div className="App" style={{
//             backgroundImage: `url("https://cdn.pixabay.com/photo/2017/06/06/22/37/italian-cuisine-2378729_960_720.jpg")`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//         }}><Title /><App {...props} /><br /><Footer /></div>, el);
//     },
// });
//
// InertiaProgress.init({ color: '#4B5563' });

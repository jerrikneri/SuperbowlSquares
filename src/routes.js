// import store from './store';
import Settings from './components/Settings';
import Squares from './components/Squares';

export default [{
        path: "/",
        name: "Squares",
        alias: "*",
        component: Squares
    },
    {
        path: "/settings",
        name: "Settings",
        component: Settings,
        meta: {
            title: 'Settings'
        },
    }
];
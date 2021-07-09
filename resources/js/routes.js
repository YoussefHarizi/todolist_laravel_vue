import AllTasks from './components/AllTasks.vue';
import AddTask from './components/AddTask.vue';
// import EditBook from './components/EditBook.vue';

export const routes = [{
        name: 'homeapp',
        path: '/homeapp',
        component: AllTasks
    },
    {
        name: 'add',
        path: '/add',
        component: AddTask
    },
    // {
    //     name: 'edit',
    //     path: '/edit/:id',
    //     component: EditBook
    // }
];
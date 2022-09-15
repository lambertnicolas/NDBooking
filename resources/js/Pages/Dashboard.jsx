import React from 'react';
import Authenticated from '../Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';

export default function Dashboard(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />
            page dashboard
        </Authenticated>
    );
}

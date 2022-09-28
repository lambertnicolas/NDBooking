import React from 'react';
import {Link, Head, InertiaLink} from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Users(props) {
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Users" />
                <div>
                    <h1>Reservation</h1>
                    <div><InertiaLink href="/reservation/2022-09-01/dinner">Lien</InertiaLink></div>
                    <div>
                            {props.users.map((user) =>
                                <p>{user.name}</p>
                            )}
                    </div>
                </div>

        </Authenticated>
    );
}

//Home.layout = (page) => <Layout children={page} />

import React from 'react';
import {Link, Head, InertiaLink} from '@inertiajs/inertia-react';
import {Layout} from '../layout';

export default function Users(props) {
    return (
        <>
            <Head title="Reservation" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
                    {props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div>
                    <h1>Reservation</h1>
                    <div><InertiaLink href="/reservation/2022-09-01/dinner">Lien</InertiaLink></div>
                    <div>
                            {props.users.map((user) =>
                                <p>{user.name}</p>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}

//Home.layout = (page) => <Layout children={page} />

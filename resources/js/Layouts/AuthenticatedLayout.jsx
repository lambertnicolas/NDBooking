import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/*<div className="shrink-0 flex items-center">*/}
                            {/*    <Link href="/">*/}
                            {/*        <ApplicationLogo className="block h-9 w-auto text-gray-500" />*/}
                            {/*    </Link>*/}
                            {/*</div>*/}

                            <div className="navbar is-transparent mb-5">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Reservations
                                </NavLink>
                                <NavLink href={route('account')} active={route().current('account')}>
                                    Account
                                </NavLink>
                                <ResponsiveNavLink method="post" href={route('logout')}>
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

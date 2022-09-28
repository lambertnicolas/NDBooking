import React, {useState} from 'react';
import Authenticated from "../Layouts/AuthenticatedLayout";
import { Head } from '@inertiajs/inertia-react';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import {Inertia} from "@inertiajs/inertia";

export default function Account(props, user) {

    const [values, setValues] = useState({
        name: props.auth.user.name,
        email: props.auth.user.email,
        restaurant: props.user[0].restaurant,
        address: props.user[0].address,
        password: "",
        password_confirmation: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
        console.log(values);
    }

    function handleSubmit(e) {
        e.preventDefault()
        Inertia.post('/account', values)
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Account" />
            <div className="columns container">
                <div className="column is-one-third is-offset-one-third box">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="label has-text-grey-light">Name :</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={handleChange}
                            value={values.name}
                            className="input is-primary mb-3"
                            required
                        />
                        <label htmlFor="email" className="label has-text-grey-light">Email :</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={values.email}
                            className="input is-primary mb-3"
                            required
                        />
                        <label htmlFor="restaurant" className="label has-text-grey-light">Restaurant :</label>
                        <input
                            id="restaurant"
                            name="restaurant"
                            type="text"
                            onChange={handleChange}
                            value={values.restaurant}
                            className="input is-primary mb-3"
                            required
                        />
                        <label htmlFor="address" className="label has-text-grey-light">Address:</label>
                        <textarea
                            className="textarea is-primary mb-3"
                            id="address"
                            name="address"
                            value={values.address}
                            onChange={handleChange}>
                        </textarea>
                        <label htmlFor="password" className="label has-text-grey-light">Password:</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={values.password}
                            className="input is-primary mb-3"
                        />
                        <label htmlFor="password_confirmation" className="label has-text-grey-light">Password confirmation:</label>
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            onChange={handleChange}
                            value={values.password_confirmation}
                            className="input is-primary mb-3"
                        />
                        <button className="button is-outlined" type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </Authenticated>
    );
}

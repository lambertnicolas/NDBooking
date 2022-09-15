import { Inertia } from '@inertiajs/inertia'
import React, { useState } from 'react'

export default function Edit() {
    const [values, setValues] = useState({
        name: "",
        phone: "",
        email: "",
        table_id: "",
        client_id: "",
        couverts: "",
        service: "",
        date: "",
        time: "",
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
        Inertia.post('/reservation', values)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input id="name" value={values.name} onChange={handleChange} />
            <label htmlFor="phone">Phone :</label>
            <input id="phone" value={values.phone} onChange={handleChange} />
            <label htmlFor="email">Email :</label>
            <input id="email" value={values.email} onChange={handleChange} />
            <label htmlFor="table_id">Table id:</label>
            <input id="table_id" value={values.table_id} onChange={handleChange} />
            <label htmlFor="couverts">Couverts :</label>
            <input id="couverts" value={values.couverts} onChange={handleChange} />
            <label htmlFor="service">Service :</label>
            <input id="service" value={values.service} onChange={handleChange} />
            <label htmlFor="date">Date :</label>
            <input id="date" value={values.date} onChange={handleChange} />
            <label htmlFor="time">Time :</label>
            <input id="time" value={values.time} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    )
}

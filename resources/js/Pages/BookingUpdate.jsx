import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {
    const { reservations } = usePage().props;

    const { data, setData, put, errors } = useForm({
        name: reservations.name || "",
        phone: reservations.phone || "",
        email: reservations.email || "",
        table_id: reservations.table_id || "",
        client_id: reservations.client_id || "",
        couverts: reservations.couverts || "",
        service: reservations.service || "",
        date: reservations.date || "",
        time: reservations.time || "",
    });
    console.log(data.name);
    function handleSubmit(e) {
        e.preventDefault();
        put(route("reservation.update", reservations.id));
    }

    return (
        <Authenticated

            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Reservation</h2>}
        >
            <Head title="Reservation Edit" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            //label="Name"
                                            name="name"
                                            placeholder={data.name}
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.phone}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Table id</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Table_id"
                                            name="table_id"
                                            value={data.table_id}
                                            onChange={(e) =>
                                                setData("table_id", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.table_id}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Client_id</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Client_id"
                                            name="client_id"
                                            value={data.client_id}
                                            onChange={(e) =>
                                                setData("client_id", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.client_id}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Couverts</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Couverts"
                                            name="couverts"
                                            value={data.couverts}
                                            onChange={(e) =>
                                                setData("couverts", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.couverts}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Date</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Date"
                                            name="date"
                                            value={data.date}
                                            onChange={(e) =>
                                                setData("date", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.date}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Time</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Time"
                                            name="time"
                                            value={data.time}
                                            onChange={(e) =>
                                                setData("time", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.time}
                                        </span>
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

import axios from 'axios';
import React from 'react';

interface ClientProps {

}

const url = "https://api.ndbooking.software/api/client"

const ClientList = (props : ClientProps) => {

    const [value, setValue] = React.useState<any>([]);

    React.useEffect(() => {
        axios.get(url)
            .then((response) => {
                console.log(response)
                setValue(response.data);
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!value) return null;
    return (
<article className='message is-success'>
        <div className='message-header'>
        <p className='has-text-centered'>Liste clients</p>
        </div>
        <div className='message-body'>
            {value.map((val: any) =>
                <div key={val.id}><p>
                    <span className="icon is-small is-left">
                        <i className="fa fa-user-o"></i>&#160;
                    </span>Name : {val.name} <br />
                    <span className="icon is-small is-left">
                        <i className="fa fa-phone"></i>&#160;
                    </span>phone : {val.phone} <br />
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>&#160;
                    </span>e-mail : {val.email} <br />
                    </p></div>
            )}
        </div>
        </article>
    )
}

export default ClientList;
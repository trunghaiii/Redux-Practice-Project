import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import { useEffect, useState } from 'react';

const TableUser = (props) => {

    const [listUser, setListUser] = useState()

    const fetchAllUser = async () => {
        const res = await axios.get("http://localhost:8080/users/all")
        const data = res && res.data ? res.data : []
        setListUser(data);
    }

    useEffect(() => {
        fetchAllUser();
    }, [])

    const handleDeleteUser = (user) => {
        console.log(user);
    }
    return (

        <Container>
            <hr />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser && listUser.length > 0 && listUser.map((item, index) => {
                        return (
                            <tr key={`users-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.username}</td>
                                <td>
                                    <button
                                        className='btn btn-danger'
                                        onClick={() => handleDeleteUser(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </Table>
        </Container>
    )
}

export default TableUser;
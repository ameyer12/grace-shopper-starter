import React, {useState, useEffect} from 'react';
import './adminuserdata.css';

const AdminUserData = ({navigate, getAllUsers}) => {

    const [userData, setUserData] = useState([]);

    const fetchAllUsers = async () => {
        const results = await getAllUsers();

        setUserData(results)
    }
    
    console.log(userData)

    useEffect(() => {
        fetchAllUsers();
    }, [])


    return(
        <div className='admin-user-data'>
            <button
                type="submit"
                id="return-to-admin-dashboard" 
                className="btn btn-primary"
                onClick={() => {
                    navigate("/admin")
                }}
                >Return to Admin Dashboard</button>
            {
                userData.map((currentItem, index) => {
                    console.log(currentItem)
                    return( <li id="user-data-card" className="card" key={index}>
                                    <div class="card-header">
                                        User Id: {currentItem.id}
                                    </div>
                                    <div className='routine-card-p'>
                                        <p id='routine-card-email'>Email: {currentItem.email}</p>
                                        <p>Password: {currentItem.password}</p>
                                    </div>
                                </li>
                    )
                })

            }
        </div>
    )
}

export default AdminUserData;
import MovieCard from "../../Components/MovieCard/MovieCard";
import {useUser} from "../../Components/UserContext/UserContext";
import UserCard from "../../Components/UserCard/UserCard";

export default function Users () {
    const {users} = useUser();
    return (
        <>
            <div>
                <h1>Users</h1>
                <div className="movie-list">
                    {users.map((user) => (
                        <UserCard user={user}></UserCard>
                    ))}
                </div>
            </div>
        </>
    )
}
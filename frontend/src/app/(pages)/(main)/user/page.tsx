'use client'

import { useAuth } from "@/app/context/AuthContext";

export default function User() {
    const { user } = useAuth();

    return(
        <div>
            <h1>User inforrmation</h1>
            <ul>
                {user?.email}
            </ul>
        </div>
    );
}
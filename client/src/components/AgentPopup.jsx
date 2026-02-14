import { useEffect, useRef, useState } from "react";
import useAuthStore from "../store/useAuthStore";

function AgentPopup() {
    const { getAgentUsers, authAgent } = useAuthStore()

    useEffect(() => {
        if (authAgent.length > 0) return
        getAgentUsers();
    }, []);

    console.log("from popup", authAgent);

    return (
        <div className="text-white">
            {authAgent?.map((list) => (
                <ul key={list._id}>
                    <li>
                        {list.name}
                    </li>
                </ul>
            ))}
        </div>
    )
}

export default AgentPopup;


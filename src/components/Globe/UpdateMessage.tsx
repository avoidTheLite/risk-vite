import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import './Globe.css'

interface UpdateMessageProps {
    message: string | null;
}

const UpdateMessage: React.FC<UpdateMessageProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    
    function closeMessage() {
        setIsVisible(false);
    }

    useEffect(() => {
        setIsVisible(false);
        
        if (message) {
            setTimeout(() => {
                setIsVisible(true);
            }, 100)
        }
    }, [message]);

    if (!message || !isVisible) {
        return null;
    }
    return (
        <div className="globe-info">
            <div className="text-left">
                {message}
                <Button size="sm"onClick={closeMessage}>Dismiss</Button>
            </div>
        </div>
    )
};

export default UpdateMessage;
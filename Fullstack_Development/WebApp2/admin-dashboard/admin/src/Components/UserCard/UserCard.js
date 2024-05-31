import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { blockUser } from '../../data/repository'; // Assuming blockUser is a function that interacts with the API

const UserCard = ({ user }) => {
    const [isBlocked, setIsBlocked] = useState(user.BLOCKED === 1);

    const handleBlockToggle = async () => {
        try {
            await blockUser(user.ID); // Make an API call to block/unblock the user
            setIsBlocked(!isBlocked);
        } catch (error) {
            console.error('Error toggling block status:', error);
            // Handle error state
        }
    };

    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>User Info</Card.Title>
                <Card.Text>Username: {user.USERNAME}</Card.Text>
                <Card.Text>EMAIL: {user.EMAIL}</Card.Text>
                <Button variant={isBlocked ? 'success' : 'danger'} onClick={handleBlockToggle}>
                    {isBlocked ? 'Unblock' : 'Block'}
                </Button>
            </Card.Body>
        </Card>
    );
};

UserCard.propTypes = {
    user: PropTypes.shape({
        ID: PropTypes.number.isRequired,
        USERNAME: PropTypes.string.isRequired,
        BLOCKED: PropTypes.number.isRequired,
    }).isRequired,
};

export default UserCard;

import React, { useState, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import UserData from './data';
import "./chip.css"
import UserImage from "./assets/user.png"

const UserSelector = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(-1);
    const dropdownRef = useRef(null);
    const [isUserAlreadySelectedVisible, setIsUserAlreadySelectedVisible] = useState(false);

    const handleUserSelect = (user) => {
        const isAlreadySelected = selectedUsers.some((selected) => selected.id === user.id);

        if (!isAlreadySelected) {
            setSelectedUsers([...selectedUsers, user]);
            setSearchTerm('');
            setSelectedUserIndex(-1);
        } else {
            setIsUserAlreadySelectedVisible(true);
            setTimeout(() => {
                setIsUserAlreadySelectedVisible(false);
            }, 1500);
        }
    };

    const handleUserRemove = (index) => {
        const newUsers = [...selectedUsers];
        newUsers.splice(index, 1);
        setSelectedUsers(newUsers);
    };

    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedUserIndex((prevIndex) => Math.min(prevIndex + 1, filteredUserData.length - 1));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedUserIndex((prevIndex) => Math.max(prevIndex - 1, -1));
                break;
            case 'Enter':
                if (selectedUserIndex !== -1) {
                    handleUserSelect(filteredUserData[selectedUserIndex]);
                }
                break;
            default:
                break;
        }

        if (selectedUserIndex !== -1 && dropdownRef.current) {
            const selectedUserItem = dropdownRef.current.querySelector(`#user-${selectedUserIndex}`);
            if (selectedUserItem) {
                selectedUserItem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            }
        }
    };

    const filteredUserData = UserData.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='custom-container'>
            <div className='head'><img src={UserImage} className='img' />
                <h1 className='custom-heading'> Users Selector</h1></div>
            {isUserAlreadySelectedVisible === true ? <h1 className='custom-error-message'>User Already Selected!</h1> : ''}
            <div className='custom-flex-container'>
                <div className="custom-input-container">
                    {selectedUsers.map((selected, index) => (
                        <div key={index} className="custom-selected-user">
                            <img
                                src={selected.image}
                                alt="Profile"
                                className="custom-profile-image"
                            />
                            <span>{selected.name}</span>
                            <HiX
                                className="custom-remove-icon"
                                onClick={() => handleUserRemove(index)}
                            />
                        </div>
                    ))}
                    <div className="custom-relative-container">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add new user..."
                            className="custom-input"

                        />
                        {searchTerm && (
                            <div
                                ref={dropdownRef}
                                className="custom-dropdown"
                            >
                                {filteredUserData.map((user, index) => (
                                    <div
                                        id={`user-${index}`}
                                        key={user.id}
                                        onClick={() => handleUserSelect(user)}
                                        className={`custom-dropdown-item ${index === selectedUserIndex ? 'custom-dropdown-item-selected' : ''}`}
                                        onMouseEnter={() => setSelectedUserIndex(index)}
                                    >
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="custom-dropdown-profile-image"
                                        />
                                        <h1>{user.name}</h1>
                                        <h1 className='custom-dropdown-email'>{`${user.email}`}</h1>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserSelector;

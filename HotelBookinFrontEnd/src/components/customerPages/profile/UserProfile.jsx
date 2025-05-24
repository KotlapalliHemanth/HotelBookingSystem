import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import s from './profile.module.css';
import updateUserDetails from '../../../store/Slices/user/updateUserDetails';

const UserProfile = () => {
    const userDetails = useSelector(state => state.user.user.userdetails);
    console.log(userDetails);
    const dispatch = useDispatch();

    // Local state for editable fields
    const [firstName, setFirstName] = useState(userDetails.firstName || '');
    const [lastName, setLastName] = useState(userDetails.lastName || '');
    const [phone, setPhone] = useState(userDetails.phone || '');
    const [address, setAddress] = useState(userDetails.address || '');
    const [profileImage, setProfileImage] = useState(null);
    const [updating, setUpdating] = useState(false);

    // For triggering file input
    const fileInputRef = React.useRef();

    const handleImageEdit = () => {
        fileInputRef.current.click();
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setUpdating(true);
        await dispatch(updateUserDetails({
            imageFile: profileImage,
            userDetails: { firstName, lastName, phone, address }
        }));
        setUpdating(false);
    };

    return (
        <div className={s.contentBox}>
            <div className={s.profileImageRow}>
                <img
                    src={profileImage ? URL.createObjectURL(profileImage) : userDetails.profileImageUrl}
                    alt="Profile"
                    className={s.profileImagePreview}
                />
                <button
                    type="button"
                    className={s.editImageBtn}
                    onClick={handleImageEdit}
                    title="Edit Profile Picture"
                >
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>
            <form onSubmit={handleUpdate} className={s.profileForm}>
                <div className={s.inputGroup}>
                    <label htmlFor="profileUsername">Username:</label>
                    <input
                        id="profileUsername"
                        type="text"
                        value={userDetails.username || ''}
                        className={s.input}
                        disabled // Username is usually not editable
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="profileEmail">Email:</label>
                    <input
                        id="profileEmail"
                        type="email"
                        value={userDetails.email || ''}
                        className={s.input}
                        disabled // Email is usually not editable
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="profileFirstName">First Name:</label>
                    <input
                        id="profileFirstName"
                        type="text"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className={s.input}
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="profileLastName">Last Name:</label>
                    <input
                        id="profileLastName"
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className={s.input}
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="profilePhone">Phone:</label>
                    <input
                        id="profilePhone"
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className={s.input}
                    />
                </div>
                <div className={s.inputGroup}>
                    <label htmlFor="profileAddress">Address:</label>
                    <input
                        id="profileAddress"
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className={s.input}
                    />
                </div>
                <button type="submit" className={s.updateBtn} disabled={updating}>
                    {updating ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;

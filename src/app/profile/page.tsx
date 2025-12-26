'use client';

import Button from "@/components/Button";
import Input from "@/components/Input";
import { getUser } from "@/redux/selectors";
import { fetchUserProfile } from "@/redux/thunks/fetchUserProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/components/ReduxProvider";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/slices/userSlice";
import { getTokenPayload } from "../auth/getTokenPayload";
import { updateUserProfileThunk } from "@/redux/thunks/updateUserProfileThunk";
import { sendForgotPasswordEmail } from "@/util/sendForgotPasswordEmail";
import { TokenPayload, User } from "@/types/types";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector(getUser);
    const router = useRouter();

    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [tokenPayload, setTokenPayload] = useState<TokenPayload | null>(null);
    const [hasMounted, setHasMounted] = useState<boolean>(false);

    useEffect(() => {
        setHasMounted(true);
        setTokenPayload(getTokenPayload());
    }, []);

    useEffect(() => {
        try {
            if (tokenPayload) {
                dispatch(fetchUserProfile(tokenPayload._id));
            }
        } catch (error) {
            console.error(error);
        }
    }, [dispatch, tokenPayload, user]);

    const [form, setForm] = useState<User | null>(null);

    useEffect(() => {
        if (user) {
            setForm({ ...user });
        }
    }, [user]);

    const changesMade =
        form?.firstName !== user?.firstName
        || form?.lastName !== user?.lastName
        || form?.phoneNumber !== user?.phoneNumber
        || form?.email !== user?.email;

    const handleSaveChanges = () => {
        if (user) {
            if (form && user._id) {
                try {
                    dispatch(updateUserProfileThunk({ ...form, _id: user._id }));
                    setSuccessMessage("User profile updated.")
                } catch (error) {
                    setError("User profile failed to update: " + error);
                }
            }
        }
    };

    const handleInputChange = (e: { target: { name: string; value: string; }; }) => {
        const { name, value } = e.target;

        if (form) {
            setForm({
                ...form,
                [name]: value
            }
            );
        }
    };

    const handleReset = () => {
        setForm({ ...user });
    }

    const handleLogout = () => {
        router.replace("/");
        dispatch(logoutUser());
        localStorage.removeItem("token");
    }

    const handleResetPassword = async () => {
        if (user.email) {
            try {
                await sendForgotPasswordEmail(user.email);
                setSuccessMessage("A password reset link has been sent to your email.");
            } catch (error) {
                setError("Error sending email: " + error);
            }
        }
    }

    if (!hasMounted || !tokenPayload || !user) {
        return null;
    }

    return (

        <main className="mx-auto px-4 flex flex-col items-center justify-center h-[calc(100vh-96px)]">

            <div className="flex flex-col gap-4 w-full max-w-[512px] ">            

                <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl mb-[24px]">Your Profile</h1>

                <div className="flex flex-col my-3 gap-4">
                    <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleSaveChanges() }}>
                        <div className="text-truncate">

                            <label>
                                Email:
                                <Input type="email" placeholder="Email" id="email" name="email"
                                    value={form?.email || ""} onChange={handleInputChange} maxLength={60} required data-cy="emailInput" />
                            </label>
                        </div>

                        <label>
                            Phone Number:
                            <Input type="tel" placeholder="Phone number" id="phoneNumber" name="phoneNumber"
                                value={form?.phoneNumber || ""} onChange={handleInputChange} maxLength={10} minLength={10} required data-cy="phoneNumberInput" />
                        </label>

                        <div className="flex gap-4 flex-wrap">
                            <label className="flex-1">
                                First Name:
                                <Input type="text" placeholder="First name" id="firstName" name="firstName" minLength={1}
                                    value={form?.firstName || ""} onChange={handleInputChange} maxLength={20} required data-cy="firstNameInput" />
                            </label>
                            <label className="flex-1">
                                Last Name:
                                <Input type="text" placeholder="Last name" id="lastName" name="lastName" minLength={1}
                                    value={form?.lastName || ""} onChange={handleInputChange} maxLength={20} required data-cy="lastNameInput" />
                            </label>
                        </div>

                        <Button type="button" color="light" size="" outline="outline" id="handleResetPassword" name="handleResetPassword" onClick={handleResetPassword} data-cy="resetPasswordButton">
                            <div className="flex flex-row gap-4">
                                <span>Reset Password</span>
                            </div>
                        </Button>

                        {successMessage && <p className="text-green-600" aria-live="polite" data-cy="successMessage">{successMessage}</p>}

                        {error && <p className="text-red-600" aria-live="polite" data-cy="errorMessage">{error}</p>}

                        <div className="mt-4 flex gap-4 flex-col place-items-center">
                            <div className="flex flex-col sm:flex-row gap-2 w-full justify-center items-center">
                                <Button type="button" color="light" size="large" outline="outline" onClick={handleReset} data-cy="resetButton">
                                    Reset
                                </Button>
                                <Button type="submit" className="btn btn-dark"
                                    name="saveButton" id="saveButton" color={"dark"} size={"large"} outline={"solid"} disabled={!changesMade} data-cy="saveButton">Save Changes</Button>
                            </div>
                            <div className="w-full">
                                <Button type="button" color="light" size="" outline="outline" id="logoutButton" name="logoutButton" onClick={handleLogout} data-cy="logoutButton">
                                    Logout
                                </Button>
                            </div>
                        </div>

                    </form>
                </div>
         
            </div >
            
        </main >
    );
}
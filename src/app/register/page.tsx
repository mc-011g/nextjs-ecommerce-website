'use client';

import {
    useState,
    ChangeEvent,
} from "react";

import Link from "next/link";
import Input from "@/components/Input";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Button from "@/components/Button";
import { registerUser } from "@/util/registerUser";
import { NewUser } from "@/types/types";

export default function RegisterPage() {
    const [registerUserForm, setForm] = useState<NewUser>({
        email: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: ""
    });

    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState(false);
    const [passwordConfirmVisibilityToggle, setPasswordConfirmVisibilityToggle] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [errorMessage, setErrorMessage] = useState<string>("");

    const [finishedSignUp, setFinishedSignUp] = useState(false);

    const onFormInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...registerUserForm, [name]: value });
    }

    const handlePasswordVisibilityToggle = () => {
        if (passwordVisibilityToggle === false) {
            setPasswordVisibilityToggle(true);
        } else {
            setPasswordVisibilityToggle(false);
        }
    }

    const handlePasswordConfirmVisibilityToggle = () => {
        if (passwordConfirmVisibilityToggle === false) {
            setPasswordConfirmVisibilityToggle(true);
        } else {
            setPasswordConfirmVisibilityToggle(false);
        }
    }

    const checkPasswordsMatching = () => {
        if ((password === passwordConfirm) && (password !== '' || passwordConfirm !== '')) {
            return true;
        } else {
            return false;
        }
    }

    const handleRegisterUser = async () => {
        try {
            await registerUser(registerUserForm);
            setFinishedSignUp(true);
        } catch (error) {
            setErrorMessage(String(error));
        }
    }

    return (
          <main className="container mx-auto px-4 flex flex-col items-center justify-center h-full py-[48px] md:py-[64px] lg:py-[96px] h-[calc(100vh-96px-160px)] sm:h-[calc(100vh-96px)]">

            <div className="flex flex-col gap-4 w-full h-fit max-w-[512px]" aria-live="polite">

                <h1 className="text-center font-bold text-3xl md:text-4xl lg:text-5xl mb-[24px]">Register Account</h1>

                {!finishedSignUp ? (
                    <>
                       <form className="flex flex-col gap-4 w-full h-full" onSubmit={(e) => { e.preventDefault(); handleRegisterUser() }}>
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col sm:flex-row gap-4">                                    
                                    <label>
                                        First Name:
                                        <Input type="text" placeholder="First Name" id="firstName" name="firstName" data-cy="firstNameInput"
                                            minLength={1} maxLength={30}
                                            value={registerUserForm.firstName} onChange={onFormInputChange} required />
                                    </label>

                                    <label>
                                        Last Name:
                                        <Input type="text" placeholder="Last Name" id="lastName" name="lastName" data-cy="lastNameInput"
                                            minLength={1} maxLength={30}
                                            value={registerUserForm.lastName} onChange={onFormInputChange} required />
                                    </label>
                                </div>

                                <label>
                                    Phone Number:
                                    <Input type="tel" placeholder="123456789" id="phoneNumber" name="phoneNumber" data-cy="phoneNumberInput" minLength={10}
                                        value={registerUserForm.phoneNumber} onChange={onFormInputChange} maxLength={10} required />
                                </label>

                                <label>
                                    Email:
                                    <Input type="email" placeholder="email@email.com" id="email" name="email" data-cy="emailInput" maxLength={60}
                                        value={registerUserForm.email} onChange={onFormInputChange} required />
                                </label>

                                <div className="relative flex flex-col sm:flex-row align-items-center gap-4">
                                    <div className="relative flex-1">
                                        <label>
                                            Password:
                                            <div>
                                                <Input type={`${passwordVisibilityToggle === false ? 'password' : 'text'}`} placeholder="Password" id="password" name="password" data-cy="passwordInput"
                                                    minLength={8}
                                                    value={registerUserForm.password} onChange={(e) => { onFormInputChange(e); setPassword(e.target.value); checkPasswordsMatching(); }} required />
                                            </div>
                                        </label>

                                        {passwordVisibilityToggle ?
                                            <EyeIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                                            :
                                            <EyeSlashIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordVisibilityToggle()} />
                                        }

                                    </div>
                                    <div className="relative flex-1">
                                        <label>
                                            Confirm Password:
                                            <div>
                                                <Input type={`${passwordConfirmVisibilityToggle === false ? 'password' : 'text'}`} placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" data-cy="confirmPasswordInput"
                                                    minLength={8} onChange={(e) => { setPasswordConfirm(e.target.value); checkPasswordsMatching() }} required />
                                            </div>
                                        </label>

                                        {passwordConfirmVisibilityToggle ?
                                            <EyeIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordConfirmVisibilityToggle()} />
                                            :
                                            <EyeSlashIcon className="w-6 h-6 z-10 absolute right-3 top-[44px] transform -translate-y-1/2 cursor-pointer" onClick={() => handlePasswordConfirmVisibilityToggle()} />
                                        }


                                        {((checkPasswordsMatching() === false) && (password !== '' || passwordConfirm !== '')) &&
                                            <div className="text-red-600" aria-live="polite" data-cy="passwordMatchError">Passwords must match</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            {errorMessage &&
                                <div className="text-red-600" aria-live="polite" data-cy="errorMessage">{errorMessage}</div>
                            }

                            <div className="justify-center flex gap-2 mt-4 flex-wrap">
                                <div className="">
                                    <Button type="submit" color="dark" size="large" outline="" disabled={!checkPasswordsMatching()} data-cy="createAccountButton">
                                        Register Account
                                    </Button>
                                </div>

                                <div className="">
                                    <Link href="/login">
                                        <Button type="button" color="light" size="large" outline="outline" data-cy="loginButton">Login</Button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col gap-4 place-items-center" data-cy="registerCompleteMessage">
                        <h1 className="text-2xl">Thank you for registering!</h1>
                        <p>Please check your email for a link to verify your account.</p>
                        <Link href="/login">
                            <Button type="button" color="dark" size="large" outline="">Login</Button>
                        </Link>
                    </div>
                )}
            </div>       
        </main>
    );
}
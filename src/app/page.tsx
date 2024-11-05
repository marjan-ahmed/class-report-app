"use client";
import Image from "next/image";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/Registration";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { useEffect, useState } from "react";
import { auth } from "./services/firebase";

export default function Home() { 
    const [isSignIn, setIsSignIn] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const toggleForm = () => {
        setIsSignIn((prev) => !prev);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(); // Ensure you have initialized Firebase elsewhere
        try {
            await signInWithPopup(auth, provider);
            router.push("/dashboard");
        } catch (error) {
            if (error) {
                console.error("Error signing in with Google: ", error);
            } else {
                console.error("Unexpected error: ", error);
            }
        }
    };

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="flex-1 relative">
                <Image
                    src={'/hero_img.JPG'}
                    alt="Left Section Image"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-4">
                <h1 className="text-3xl font-bold mb-6">Welcome! My name is Marjan Ahmed</h1>
                <div>
                    {isSignIn ? (
                        <SignInForm onGoogleSignIn={handleGoogleSignIn} onSwitch={toggleForm} />
                    ) : (
                        <SignUpForm onSwitch={toggleForm} onGoogleSignUp={handleGoogleSignIn} />
                    )}
                </div>
            </div>
        </div>
    );
};

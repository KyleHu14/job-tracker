"use client";

// Components
import LoginForm from "@/components/LoginForm/LoginForm";

import { loginWithGoogle } from "@/utils/supabase/server-actions";

const page = () => {
    return (
        <>
            <LoginForm />
            {/* prettier-ignore */}
            <button onClick={() => {loginWithGoogle()}}>Hope this works</button>
        </>
    );
};

export default page;

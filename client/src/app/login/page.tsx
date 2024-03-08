// Components
import LoginForm from "@/components/LoginForm/LoginForm";
import { loginWithGoogle } from "./actions";

const page = () => {
    return (
        <form>
            <button formAction={loginWithGoogle}>Log in</button>
        </form>
    );
};

export default page;

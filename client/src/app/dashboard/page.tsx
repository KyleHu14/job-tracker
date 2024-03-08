import { createClient } from "@/utils/supabase/server";

export default async function Account() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    return <>Hello {user?.email}</>;
}

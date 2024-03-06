"use client";

import { supabase } from "@/supabase/client";

export default async function PrivatePage() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        console.log(error);
        return <>no</>;
    }

    return <p>Hello {data.user.email}</p>;
}

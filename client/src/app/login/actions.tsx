"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function loginWithGoogle() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            queryParams: {
                access_type: "offline",
                prompt: "consent",
            },
            redirectTo: "http://localhost:3000/dashboard",
        },
    });

    if (data?.url) {
        redirect(data.url);
    }

    if (error) {
        redirect("/error");
    }
}

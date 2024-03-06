"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Text, Paper, Center } from "@mantine/core";

import classes from "./LoginForm.module.css";
import { GoogleButton } from "../GoogleButton/GoogleButton";

function LoginForm() {
    const [type, toggle] = useToggle(["login", "register"]);
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });

    return (
        <Center classNames={{ root: classes.centerRoot }}>
            <Paper
                classNames={{ root: classes.paperRoot }}
                radius="md"
                p="xl"
                withBorder
            >
                {/* prettier-ignore */}
                <Text size="lg" fw={500} classNames={{root: classes.textRoot}}>
                    Welcome to <Text span variant="gradient" gradient={{ from: 'indigo.4', to: 'violet' }}>JobTracker</Text> {type} with
                </Text>
                {/* prettier-ignore */}
                <GoogleButton radius="xl">Google</GoogleButton>
            </Paper>
        </Center>
    );
}

export default LoginForm;

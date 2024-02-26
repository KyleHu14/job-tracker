"use client";

import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Checkbox,
    Anchor,
    Stack,
    Center,
} from "@mantine/core";

import classes from "./LoginForm.module.css";

function LoginForm(props: PaperProps) {
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
                <Text size="lg" fw={500}>
                    Welcome to JobTracker, {type} with
                </Text>

                <form
                    onSubmit={form.onSubmit((values) =>
                        console.log(values, type),
                    )}
                >
                    <Stack>
                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "email",
                                    event.currentTarget.value,
                                )
                            }
                            error={form.errors.email && "Invalid email"}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "password",
                                    event.currentTarget.value,
                                )
                            }
                            error={
                                form.errors.password &&
                                "Password should include at least 6 characters"
                            }
                            radius="md"
                        />

                        {type === "register" && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "terms",
                                        event.currentTarget.checked,
                                    )
                                }
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor
                            component="button"
                            type="button"
                            c="dimmed"
                            onClick={() => toggle()}
                            size="xs"
                        >
                            {type === "register"
                                ? "Already have an account? Login"
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Center>
    );
}

export default LoginForm;

import { useState } from 'react';
import { Container, Group, Burger, Title, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './Header.module.css';

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        {/* Desktop View*/}
        <Title classNames={{ root: classes.titleRoot }} order={2} visibleFrom="xs">
          Job Tracker
        </Title>
        <Button color="indigo.6" visibleFrom="xs">
          Sign Up
        </Button>

        {/* Mobile View */}
        <Title classNames={{ root: classes.titleRoot }} order={3} hiddenFrom="xs">
          Job Tracker
        </Title>
        <Button color="indigo.6" hiddenFrom="xs" size="compact-sm">
          Sign Up
        </Button>
      </Container>
    </header>
  );
}

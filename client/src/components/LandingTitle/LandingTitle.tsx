import { Text, Title } from '@mantine/core';
import classes from './LandingTitle.module.css';

const LandingTitle = () => {
  return (
    <>
      {/* Desktop Title */}
      <Title className={classes.title} fw="900" ta="center" mt={100} visibleFrom="xs">
        Welcome to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'indigo.4', to: 'violet' }}
        >
          Job Tracker
        </Text>
      </Title>
      <Title c="gray.8" fw="300" ta="center" visibleFrom="xs">
        Manage all your job applications all in one place
      </Title>
      {/* Mobile Title */}
      <Title className={classes.smallTitle} ta="center" mt={100} hiddenFrom="xs">
        Welcome to{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'indigo.4', to: 'violet' }}
        >
          Job Tracker
        </Text>
      </Title>
      <Title c="gray.8" fw="300" ta="center" className={classes.smallSubTitle} hiddenFrom="xs">
        Manage all your job applications all in one place
      </Title>
    </>
  );
};

export default LandingTitle;

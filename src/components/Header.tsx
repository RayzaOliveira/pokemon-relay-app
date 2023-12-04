import { Button, Flex } from '@ttoss/ui';
import { useLocation, useNavigate } from 'react-router-dom';

const MENU = [
  {
    key: 'wrong',
    path: '/',
    label: 'Wrong pagination',
  },
  {
    key: 'correct',
    path: '/people-paginated',
    label: 'Correct Pagination',
  },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Flex sx={{ gap: 'md', paddingY: 'xl' }}>
      {MENU.map((menu) => {
        const isCurrentMenu = location.pathname === menu.path;

        return (
          <Button
            variant={isCurrentMenu ? 'primary' : 'secondary'}
            sx={{
              fontSize: 'lg',
              padding: 'md',
            }}
            onClick={() => navigate(menu.path)}
            key={menu.label}
          >
            {menu.label}
          </Button>
        );
      })}
    </Flex>
  );
};

import Dropdown from '@components/@common/Dropdown/Dropdown';

import { useAuthSubscription } from '@hooks/auth/useAuthSubscription';

function UserDropdown() {
  const { authenticatedUser } = useAuthSubscription();

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <button className='mr-2' type='button'>
          반가워요, {authenticatedUser.name}님!
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item>메뉴1</Dropdown.Item>
        <Dropdown.Item>메뉴2</Dropdown.Item>
        <Dropdown.Item>메뉴3</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default UserDropdown;

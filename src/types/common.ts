interface IHeaderProps {
  admin_token: string | undefined;
  user_token: string | undefined;
  recieveCookieUserData: () => void;
}

export type { IHeaderProps };

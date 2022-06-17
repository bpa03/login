import { useAppSelector } from 'app/hooks';
import { selectAuthState } from 'app/features/auth';
import { useMemo } from 'react';

export default function useAuth() {
  const authState = useAppSelector(selectAuthState);
  return useMemo(() => authState, [authState]);
}

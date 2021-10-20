import { useContext } from 'react';
import Context from '../Context';

export default function useDispatch() {
  const { dispatch } = useContext(Context);

  return dispatch;
}

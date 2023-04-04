import { Status } from '../types/status';

export const getStatus = (status: Status) => ({
  isLoading: status === Status.PENDING,
  isSuccess: status === Status.SUCCESS,
  isError: status === Status.ERROR,
});

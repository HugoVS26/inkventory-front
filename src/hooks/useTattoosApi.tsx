import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  TattooStructure,
  TattooStructureWithoutId,
} from "../store/features/tattoos/types";
import { useAppDispatch } from "../store/hooks";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../store/features/ui/uiSlice";

const useTattoosApi = () => {
  const dispatch = useAppDispatch();

  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const getTattoos = useCallback(async () => {
    dispatch(showLoadingActionCreator());
    try {
      const { data: tattoos } = await axios.get<{
        tattoos: TattooStructure[];
      }>(`/tattoos`);

      dispatch(hideLoadingActionCreator());

      return tattoos;
    } catch (error) {
      dispatch(hideLoadingActionCreator());

      throw new Error((error as Error).message);
    }
  }, [dispatch]);

  const deleteTattoo = useCallback(
    async (tattooId: string) => {
      dispatch(showLoadingActionCreator());
      try {
        const { data } = await axios.delete(`/tattoos/delete/${tattooId}`);

        dispatch(hideLoadingActionCreator());

        toast.success("Tattoo deleted succesfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        return data;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error("There was an error deleting the tattoo", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [dispatch],
  );

  const addTattoo = useCallback(
    async (
      newTattoo: TattooStructureWithoutId,
    ): Promise<TattooStructure | undefined> => {
      try {
        dispatch(showLoadingActionCreator());

        const {
          data: { tattoo },
        } = await axios.post<{ tattoo: TattooStructure }>(
          `/tattoos/add`,
          newTattoo,
        );

        toast.success("The tattoo has been created succesfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(hideLoadingActionCreator());

        return tattoo;
      } catch {
        dispatch(hideLoadingActionCreator());

        toast.error("There was an error creating the tattoo", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    },
    [dispatch],
  );

  const getTattoo = useCallback(
    async (_id: string): Promise<TattooStructure | void> => {
      try {
        dispatch(showLoadingActionCreator());

        const {
          data: { tattoo },
        } = await axios.get<{ tattoo: TattooStructure }>(`/tattoos/${_id}`);

        dispatch(hideLoadingActionCreator());

        return tattoo;
      } catch (error) {
        dispatch(hideLoadingActionCreator());

        throw new Error((error as Error).message);
      }
    },
    [dispatch],
  );

  return { getTattoos, deleteTattoo, addTattoo, getTattoo };
};

export default useTattoosApi;

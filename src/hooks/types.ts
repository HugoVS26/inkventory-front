import { TattoosStateStructure } from "../store/features/tattoos/types";

export interface UseTattoosApiStructure {
  getTattoos: () => Promise<TattoosStateStructure | void>;
  deleteTattoo: (tattooId: string) => Promise<TattoosStateStructure | void>;
}

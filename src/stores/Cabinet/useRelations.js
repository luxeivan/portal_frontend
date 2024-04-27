import { create } from "zustand";
import axios from "axios";
import config from "../../config";

const useRelations = create((set, get) => ({
  relations: [],
}));

export default useRelations;

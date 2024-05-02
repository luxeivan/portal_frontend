import { create } from "zustand";
import axios from "axios";
import config from "../../config";
import { relativeTimeThreshold } from "moment/moment";

const useRelations = create((set, get) => ({
  relations: [],
}));

export default useRelations;

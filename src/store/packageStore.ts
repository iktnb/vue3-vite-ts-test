/* eslint-disable no-console */
import { AxiosResponse } from "axios";
import { defineStore } from "pinia";
import $axios from "@/lib/axios";
import { Package, SearchRequestResponse, SearchRequestParams } from "@/types/package";

const usePackageStore = defineStore("packagesStore", {
  state: () => ({
    packages: <Package[]>[],
    total: <number>0,
    limit: <number>10,
    currentPage: <number>1,

    loading: <boolean>false,
    text: <string>""
  }),

  getters: {
    pages: (state) => Math.ceil(state.total / state.limit),

    searchRequestParams: (state) => ({
      text: state.text,
      size: state.limit,
      from: (state.currentPage - 1) * state.limit
    })
  },

  actions: {
    requestSearch(params?: SearchRequestParams): Promise<AxiosResponse<SearchRequestResponse>> {
      return $axios.get("/search", { params });
    },

    async fetchPackages() {
      try {
        this.loading = true;
        const { data } = await this.requestSearch(this.searchRequestParams);
        this.packages = data.objects.map((object) => object.package);
        this.total = data.total;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
});

export default usePackageStore;

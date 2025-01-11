<template>
  <section class="searchbar py-4">
    <div class="container">
      <form action="" class="d-flex align-items-center gap-3">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Search by user name or description "
            @input="debouncedSearch"
          />
        </div>

        <select
          class="form-select text-capitalize"
          :style="{ backgroundImage: `url(${dropdownArrown})` }"
          @change="handleSelect"
        >
          <option value="-1" selected>all ratings</option>
          <option value="5">excellent</option>
          <option value="4">good</option>
          <option value="3">fair</option>
          <option value="2">poor</option>
          <option value="1">unacceptable</option>
        </select>
      </form>
    </div>
  </section>
</template>

<script>
import DorpDownArrow from "../../assets/dropdown-arrow.svg";
import { createNamespacedHelpers } from "vuex";
import { FILTER_RATE, SEARCH_TEXT } from "../../store/utils/action-types";
import { debounce } from "../../utils/debounce";
const { mapActions } = createNamespacedHelpers("reviews");
export default {
  name: "Filtration",
  data() {
    return {
      dropdownArrown: DorpDownArrow,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.handleSearch, 500);
  },
  methods: {
    ...mapActions({
      filterRate: FILTER_RATE,
      search: SEARCH_TEXT,
    }),
    handleSelect(e) {
      this.filterRate(parseInt(e.target.value));
    },
    handleSearch(e) {
      this.search(e.target.value);
    },
  },
};
</script>
<style scoped>
.form-select {
  display: block;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  -moz-padding-start: calc(0.75rem - 3px);
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  border: 1px solid #ced4da;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  appearance: none;
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0.375rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.form-group {
  flex: 1;
  flex-basis: 80%;
}
.form-control {
  padding: 0.275rem 0.75rem;
}
.form-control,
select {
  border-color: #939393;
}
select {
  flex: 1;
  font-size: 14px;
}

select option {
  border-bottom: 1px solid #939393;
}
</style>

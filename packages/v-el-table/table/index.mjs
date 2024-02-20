import { ElTable as p, ElTableColumn as u } from "element-plus";
import { h as o } from "vue";
import { eventsTransform as m } from "../utils/index.mjs";
const T = function({ events: a = {}, table: r = { data: [], tableLayout: "auto" }, columns: e = [] }, { slots: { append: l } }) {
  const s = {
    default: () => e.map((t) => {
      const { default: n, header: f } = t;
      return o(u, t, { default: n, header: f });
    }),
    append: l
  };
  return o(p, { ...m(a), ...r }, s);
};
export {
  T as default
};
//# sourceMappingURL=index.mjs.map

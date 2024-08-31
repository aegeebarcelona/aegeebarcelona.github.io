import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-2 gap-7 md:grid-cols-3 xl:grid-cols-4">
      {feature_list.map((item, i) => {
        const FeatherIcon = Icon[humanize(item.icon)];
        return (
          <div
            key={i}
            className="flex flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
          >
            <span className="icon mb-4 mx-auto">
              <FeatherIcon />
            </span>
            <div className="text-center">
              <h3 className="h4 text-xl lg:text-2xl">{item.title}</h3>
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;

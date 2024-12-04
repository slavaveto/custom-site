import { useContext } from "react";
import { AppContext } from "@/context/app-context-provider";

export const TabNav = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  const { pagesData } = useContext(AppContext);
  const page2Data = pagesData?.find((page) => page.object === "page-2");
  console.log(page2Data?.pageTabs);

  return (
    <div className="w-full">
      <ul className="flex gap-1 w-full">
        {page2Data?.pageTabs?.map((tab: any, index) => (
          <li
            className={`flex-1 text-center border-b-2 cursor-pointer text-sm text-gray-500 ${
              selectedTab === tab?.name ? "border-blue-500" : "border-gray-300"
            } `}
            key={tab?.name}
            onClick={() => setSelectedTab(tab?.name)}
          >
            {tab?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { PageNav } from "../../components/page-nav";
import { TabNav } from "../../components/tab-nav";

export default function Home() {
  return (
    <div className="flex flex-col">
      <TabNav />
      <div className="mt-4"></div>
      <div className="mt-8">Page content goes here.</div>
    </div>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./ui/Header";
import BookList from "./pages/BookList";
import AddBookButton from "./features/bookdetails/AddBookButton";

function AppLayout() {
  return (
    <div className="flex h-dvh flex-col">
      <Header />
      <main className="grid flex-grow grid-cols-5 divide-x-2 divide-stone-100 overflow-hidden">
        <BookList />
        <Outlet />
        <AddBookButton />
      </main>
    </div>
  );
}

export default AppLayout;

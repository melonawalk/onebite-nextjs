import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    if (!q) {
      return;
    }

    const fetchSearchResult = async () => {
      const data = await fetchBooks(q as string);
      setBooks(data);
    };

    fetchSearchResult();
  }, [q]);

  return (
    <div>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png"></meta>
        <meta property="og:title" content="한입북스 - 검색결과"></meta>
        <meta
          property="og:description"
          content="한입 북스에 등록된 되서들을 만나보세요"
        ></meta>
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};

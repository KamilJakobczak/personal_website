import { createBrowserRouter } from 'react-router-dom';
import Book from '../components/Projects/book_collection/Book';
import BookCollection from '../components/Projects/BookCollection';
import BookList from '../components/Projects/book_collection/BookList';
import App from '../components/App';
import Gallery from '../components/Projects/Gallery';
import Blog from '../components/Projects/Blog';
import CodePlayground from '../components/Projects/CodePlayground';
import ScrollerComponent from '../components/Scroller/Scroller';
import { apollo_client } from '../ApolloClient';
import { ApolloProvider } from '@apollo/client';
import AuthorList from '../components/Projects/book_collection/AuthorList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ScrollerComponent />,
  },
  {
    path: '/apps',
    element: <App />,
    children: [
      {
        path: '/apps/collection',
        element: (
          <ApolloProvider client={apollo_client}>
            <BookCollection />
          </ApolloProvider>
        ),
        children: [
          {
            path: '/apps/collection/books',
            element: <BookList />,
          },
          { path: '/apps/collection/books/:id', element: <Book /> },
          { path: '/apps/collection/authors', element: <AuthorList /> },
          { path: '/apps/collection/publishers' },
          { path: '/apps/collection/genres' },
        ],
      },
      {
        path: '/apps/coding',
        element: <CodePlayground />,
      },
      {
        path: '/apps/gallery',
        element: <Gallery />,
      },
      {
        path: '/apps/blog',
        element: <Blog />,
      },
    ],
  },
]);

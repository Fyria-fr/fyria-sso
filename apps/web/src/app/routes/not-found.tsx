import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes.config.ts';

export const NotFoundRoute = () => {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          La page n'existe pas
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Désolé, nous ne pouvons pas trouver la page que vous cherchez.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={APP_ROUTES.app.getHref()}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Revenir en arrière
          </Link>
        </div>
      </div>
    </main>
  );
};

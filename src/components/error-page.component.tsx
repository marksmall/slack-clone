import React, { FC, ReactElement } from 'react';

import { useRouteError } from 'react-router-dom';

const ErrorPage: FC = (): ReactElement => {
  const error = useRouteError();
  console.log('ROUTE ERROR: ', error);

  return (
    <div className="flex min-h-screen flex-col">
      <h1>Oops!</h1>

      <p>Sorry, an unexpected error has occurred.</p>

      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;

import React, { FC, ReactElement } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router-dom';

import { ErrorFallback, errorHandler } from '~/components/error-fallback.component';
import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

const App: FC = (): ReactElement => (
  <div className="flex min-h-screen flex-col">
    <Header />

    <main className="grow">
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={errorHandler}
        onReset={() => console.log('Resetting after error')}
      >
        <div>App content</div>
        <Outlet />
      </ErrorBoundary>
    </main>

    <Footer />
  </div>
);

export default App;

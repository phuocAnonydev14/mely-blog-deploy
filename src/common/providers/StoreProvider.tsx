'use client';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <div>{children}</div>
    // </PersistGate>
    // </Provider>
  );
}

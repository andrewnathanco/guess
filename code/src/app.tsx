// @refresh reload
import { Router } from "@solidjs/router";
import { Suspense } from "solid-js";
import { FileRoutes } from "@solidjs/start/router";
import { MetaProvider } from "@solidjs/meta";
import "./app.css";

export default function App() {
  return (
    <MetaProvider>
      <Router
        base={import.meta.env.SERVER_BASE_URL}
        root={(props) => (
          <>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </MetaProvider>
  );
}

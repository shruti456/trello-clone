import styles from "./App.module.css";

import Header from "./ui/header";
import AppRoutes from "./routes/approutes";
import Sidebar from "./ui/Sidebar";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.sidebarNContent}>
        <Sidebar />
        <main>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export default function AdminLayout({ children }) {
    return (
        <div style={{ display: "flex" }}>

            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div style={{ flex: 1 }}>
                <Navbar />

                <div style={{ padding: "20px" }}>
                    {children}
                </div>
            <Footer />
            </div>
        </div>
    );
}